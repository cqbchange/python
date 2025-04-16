from moviepy.editor import VideoFileClip
import speech_recognition as sr


# 视频转音频
def video_to_audio(video_path, audio_output_path):
    # 创建VideoFileClip对象
    video = VideoFileClip(video_path)

    # 提取音频
    audio = video.audio

    # 保存音频文件
    audio.write_audiofile(audio_output_path)


# 音频转文字
def audio_to_text(audio_path):
    # 创建Recognizer对象
    recognizer = sr.Recognizer()

    # 读取音频文件
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)

    # 将音频转换为文字
    text = recognizer.recognize_google(audio)

    # 打印转换结果
    print(text)


# 示例用法
video_path = "video.mp4"  # 视频文件路径或文件名
audio_output_path = "audio.wav"  # 音频文件输出路径或文件名
audio_path = "audio.wav"  # 音频文件路径或文件名

# 视频转音频
video_to_audio(video_path, audio_output_path)
