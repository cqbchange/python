import os
import time
import json
import logging
from datetime import datetime
from typing import Dict, List, Tuple, Optional
import numpy as np
import pandas as pd

# 导入评估框架
from graphrag_bench import evaluate_retrieval, evaluate_generation, load_benchmark_dataset
from langsmith import Client
from langsmith.evaluation import evaluate, RunEvaluator
from langsmith.schemas import Example, Run, EvaluationResult

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("rag_evaluation.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("RAGEvaluator")


class RAGEvaluator:
    def __init__(self,
                 langsmith_api_key: Optional[str] = None,
                 dataset_name: str = "rag_benchmark_dataset",
                 output_dir: str = "evaluation_results"):
        """
        初始化RAG评估器

        Args:
            langsmith_api_key: LangSmith API密钥
            dataset_name: 评估数据集名称
            output_dir: 评估结果输出目录
        """
        self.langsmith_client = Client(api_key=langsmith_api_key) if langsmith_api_key else None
        self.dataset_name = dataset_name
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

        # 加载评估数据集
        self.dataset = self._load_dataset()

        # 评估结果存储
        self.results = {
            "retrieval_metrics": {},
            "generation_metrics": {},
            "overall_metrics": {},
            "detailed_results": []
        }

        logger.info("RAG评估器初始化完成")

    def _load_dataset(self) -> List[Dict]:
        """加载评估数据集"""
        try:
            # 尝试从LangSmith加载数据集
            if self.langsmith_client:
                dataset = self.langsmith_client.list_examples(dataset_name=self.dataset_name)
                return [{"question": ex.inputs["question"], "ground_truth": ex.outputs["answer"],
                         "documents": ex.inputs.get("documents", [])} for ex in dataset]

            # 从graphrag-bench加载默认基准数据集
            logger.info(f"从graphrag-bench加载基准数据集")
            return load_benchmark_dataset(self.dataset_name)
        except Exception as e:
            logger.error(f"加载数据集失败: {str(e)}")
            raise

    def evaluate_retrieval_component(self, retrieval_func, k_values: List[int] = [1, 3, 5, 10]) -> Dict:
        """
        评估检索组件

        Args:
            retrieval_func: 检索函数，输入问题，输出文档列表
            k_values: 评估不同k值下的检索性能

        Returns:
            检索评估指标字典
        """
        logger.info("开始评估检索组件...")
        start_time = time.time()

        # 准备评估数据
        questions = [item["question"] for item in self.dataset]
        ground_truth_docs = [item["documents"] for item in self.dataset]

        # 执行检索
        retrieved_results = []
        retrieval_times = []

        for question in questions:
            start = time.time()
            docs = retrieval_func(question)
            retrieval_times.append(time.time() - start)
            retrieved_results.append(docs)

        # 计算检索指标
        retrieval_metrics = evaluate_retrieval(
            retrieved_results,
            ground_truth_docs,
            k_values=k_values
        )

        # 添加检索时间指标
        retrieval_metrics["average_retrieval_time_ms"] = np.mean(retrieval_times) * 1000
        retrieval_metrics["retrieval_time_std_ms"] = np.std(retrieval_times) * 1000

        # 保存结果
        self.results["retrieval_metrics"] = retrieval_metrics

        logger.info(f"检索组件评估完成，耗时: {time.time() - start_time:.2f}秒")
        return retrieval_metrics

    def evaluate_generation_component(self, generation_func) -> Dict:
        """
        评估生成组件

        Args:
            generation_func: 生成函数，输入(问题, 文档列表)，输出回答

        Returns:
            生成评估指标字典
        """
        logger.info("开始评估生成组件...")
        start_time = time.time()

        # 准备评估数据
        evaluation_results = []
        generation_times = []

        for item in self.dataset:
            question = item["question"]
            docs = item["documents"]
            ground_truth = item["ground_truth"]

            # 执行生成
            start = time.time()
            answer = generation_func(question, docs)
            generation_times.append(time.time() - start)

            # 评估生成结果
            result = evaluate_generation(
                question=question,
                answer=answer,
                ground_truth=ground_truth,
                documents=docs
            )

            # 保存详细结果
            self.results["detailed_results"].append({
                "question": question,
                "ground_truth": ground_truth,
                "generated_answer": answer,
                "metrics": result
            })

            evaluation_results.append(result)

        # 计算平均生成指标
        generation_metrics = {
            "average_faithfulness": np.mean([r["faithfulness"] for r in evaluation_results]),
            "average_relevance": np.mean([r["relevance"] for r in evaluation_results]),
            "average_fluency": np.mean([r["fluency"] for r in evaluation_results]),
            "average_completeness": np.mean([r["completeness"] for r in evaluation_results]),
            "average_hallucination_rate": np.mean([r["hallucination_rate"] for r in evaluation_results]),
            "average_generation_time_ms": np.mean(generation_times) * 1000,
            "generation_time_std_ms": np.std(generation_times) * 1000
        }

        # 保存结果
        self.results["generation_metrics"] = generation_metrics

        logger.info(f"生成组件评估完成，耗时: {time.time() - start_time:.2f}秒")
        return generation_metrics

    def evaluate_end_to_end(self, rag_pipeline_func) -> Dict:
        """
        评估端到端RAG系统

        Args:
            rag_pipeline_func: RAG流水线函数，输入问题，输出回答

        Returns:
            端到端评估指标字典
        """
        logger.info("开始端到端评估...")
        start_time = time.time()

        # 如果有LangSmith客户端，使用LangSmith进行评估
        if self.langsmith_client:
            try:
                # 注册数据集（如果不存在）
                dataset = self.langsmith_client.create_dataset(
                    dataset_name=self.dataset_name,
                    description="RAG系统评估数据集"
                )

                # 评估RAG流水线
                evaluation_results = evaluate(
                    rag_pipeline_func,
                    data=dataset,
                    evaluators=[
                        "qa",  # 问答评估
                        "embedding_distance",  # 嵌入距离评估
                        "faithfulness"  # 事实一致性评估
                    ],
                    client=self.langsmith_client,
                )

                # 处理LangSmith评估结果
                overall_metrics = {
                    "average_score": np.mean([r.score for r in evaluation_results]),
                    "success_rate": sum(1 for r in evaluation_results if r.score >= 0.7) / len(evaluation_results)
                }
            except Exception as e:
                logger.warning(f"LangSmith评估失败，将使用本地评估: {str(e)}")
                overall_metrics = self._local_end_to_end_evaluation(rag_pipeline_func)
        else:
            # 本地端到端评估
            overall_metrics = self._local_end_to_end_evaluation(rag_pipeline_func)

        # 计算端到端响应时间
        response_times = []
        for item in self.dataset[:5]:  # 抽样计算响应时间
            start = time.time()
            rag_pipeline_func(item["question"])
            response_times.append(time.time() - start)

        overall_metrics["average_e2e_response_time_ms"] = np.mean(response_times) * 1000

        # 计算综合评分（加权）
        if self.results["retrieval_metrics"] and self.results["generation_metrics"]:
            overall_metrics["overall_quality_score"] = (
                    0.4 * self.results["retrieval_metrics"]["mean_reciprocal_rank"] * 100 +
                    0.6 * self.results["generation_metrics"]["average_relevance"]
            )

        # 保存结果
        self.results["overall_metrics"] = overall_metrics

        logger.info(f"端到端评估完成，耗时: {time.time() - start_time:.2f}秒")
        return overall_metrics

    def _local_end_to_end_evaluation(self, rag_pipeline_func) -> Dict:
        """本地端到端评估实现"""
        scores = []
        for item in self.dataset:
            question = item["question"]
            ground_truth = item["ground_truth"]

            answer = rag_pipeline_func(question)

            # 简单的相关性评分
            score = self._calculate_simple_relevance_score(answer, ground_truth)
            scores.append(score)

        return {
            "average_score": np.mean(scores),
            "success_rate": sum(1 for s in scores if s >= 0.7) / len(scores)
        }

    def _calculate_simple_relevance_score(self, answer: str, ground_truth: str) -> float:
        """简单的相关性评分计算"""
        # 实际应用中可以使用更复杂的算法
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity

        if not answer or not ground_truth:
            return 0.0

        vectorizer = TfidfVectorizer().fit_transform([answer, ground_truth])
        vectors = vectorizer.toarray()
        return cosine_similarity(vectors)[0][1]

    def save_results(self, suffix: Optional[str] = None) -> str:
        """
        保存评估结果

        Args:
            suffix: 结果文件名后缀

        Returns:
            保存的文件路径
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"evaluation_results_{timestamp}"
        if suffix:
            filename += f"_{suffix}"
        filename += ".json"

        filepath = os.path.join(self.output_dir, filename)

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(self.results, f, ensure_ascii=False, indent=2)

        logger.info(f"评估结果已保存至: {filepath}")
        return filepath

    def generate_report(self, results_file: Optional[str] = None) -> str:
        """
        生成评估报告

        Args:
            results_file: 结果文件路径，如果为None则使用当前结果

        Returns:
            报告文件路径
        """
        if results_file:
            with open(results_file, "r", encoding="utf-8") as f:
                results = json.load(f)
        else:
            results = self.results

        # 生成报告
        report = []
        report.append("# RAG系统评估报告")
        report.append(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append(f"评估样本数: {len(results['detailed_results'])}")

        # 检索指标部分
        report.append("\n## 检索组件评估结果")
        retrieval = results["retrieval_metrics"]
        for k in [1, 3, 5, 10]:
            if f"recall@{k}" in retrieval:
                report.append(f"- Recall@{k}: {retrieval[f'recall@{k}']:.4f}")
                report.append(f"- Precision@{k}: {retrieval[f'precision@{k}']:.4f}")
                report.append(f"- F1@{k}: {retrieval[f'f1@{k}']:.4f}")
        report.append(f"- 平均倒数排名(MRR): {retrieval.get('mean_reciprocal_rank', 0):.4f}")
        report.append(f"- 平均检索时间: {retrieval.get('average_retrieval_time_ms', 0):.2f}ms")

        # 生成指标部分
        report.append("\n## 生成组件评估结果")
        generation = results["generation_metrics"]
        report.append(f"- 平均事实一致性: {generation.get('average_faithfulness', 0):.2f}/100")
        report.append(f"- 平均答案相关性: {generation.get('average_relevance', 0):.2f}/100")
        report.append(f"- 平均流畅性: {generation.get('average_fluency', 0):.2f}/100")
        report.append(f"- 平均完整性: {generation.get('average_completeness', 0):.2f}/100")
        report.append(f"- 平均幻觉率: {generation.get('average_hallucination_rate', 0):.2%}")
        report.append(f"- 平均生成时间: {generation.get('average_generation_time_ms', 0):.2f}ms")

        # 综合指标部分
        report.append("\n## 综合评估结果")
        overall = results["overall_metrics"]
        report.append(f"- 整体质量评分: {overall.get('overall_quality_score', 0):.2f}/100")
        report.append(f"- 成功率(评分≥70): {overall.get('success_rate', 0):.2%}")
        report.append(f"- 平均端到端响应时间: {overall.get('average_e2e_response_time_ms', 0):.2f}ms")

        # 保存报告
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_filename = f"evaluation_report_{timestamp}.md"
        report_filepath = os.path.join(self.output_dir, report_filename)

        with open(report_filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(report))

        logger.info(f"评估报告已生成: {report_filepath}")
        return report_filepath


# 示例使用
if __name__ == "__main__":
    # 示例RAG组件
    class ExampleRAGComponents:
        @staticmethod
        def retrieval_function(question: str) -> List[Dict]:
            """示例检索函数"""
            # 在实际应用中，这里会调用真实的检索系统
            return [{"content": f"与问题'{question}'相关的文档内容..."}]

        @staticmethod
        def generation_function(question: str, documents: List[Dict]) -> str:
            """示例生成函数"""
            # 在实际应用中，这里会调用真实的生成模型
            return f"针对问题'{question}'的回答，基于提供的文档内容生成..."

        @staticmethod
        def rag_pipeline(question: str) -> str:
            """示例端到端RAG流水线"""
            docs = ExampleRAGComponents.retrieval_function(question)
            return ExampleRAGComponents.generation_function(question, docs)


    # 初始化评估器
    evaluator = RAGEvaluator(
        langsmith_api_key=os.getenv("LANGSMITH_API_KEY"),
        dataset_name="default_rag_benchmark"
    )

    # 评估检索组件
    retrieval_metrics = evaluator.evaluate_retrieval_component(
        ExampleRAGComponents.retrieval_function,
        k_values=[1, 3, 5]
    )

    # 评估生成组件
    generation_metrics = evaluator.evaluate_generation_component(
        ExampleRAGComponents.generation_function
    )

    # 端到端评估
    overall_metrics = evaluator.evaluate_end_to_end(
        ExampleRAGComponents.rag_pipeline
    )

    # 保存结果并生成报告
    results_file = evaluator.save_results()
    evaluator.generate_report(results_file)

    # 打印关键指标
    print("\n关键评估指标:")
    print(f"检索MRR: {retrieval_metrics.get('mean_reciprocal_rank', 0):.4f}")
    print(f"生成事实一致性: {generation_metrics.get('average_faithfulness', 0):.2f}/100")
    print(f"整体质量评分: {overall_metrics.get('overall_quality_score', 0):.2f}/100")
