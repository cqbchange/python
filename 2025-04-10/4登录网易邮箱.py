import time
from selenium import webdriver
from selenium.webdriver.common.by import By

class LoginEmail:
    def __init__(self):
        self.browser = webdriver.Chrome()

    def open_email(self,login_url):
        self.browser.get(login_url)
        time.sleep(3)

    def login(self,email_account,email_password):
        iframe = self.browser.find_element(By.XPATH,'//div[@id="loginDiv"]/iframe[@scrolling="no"]')
        self.browser.switch_to.frame(iframe)
        self.browser.find_element(By.XPATH,'//input[@name="email"]').send_keys(email_account)
        self.browser.find_element(By.XPATH,'//div[@class="u-input box"]//input[@name="password"]').send_keys(email_password)
        time.sleep(3)
        self.browser.find_element(By.XPATH,'//*[@id="dologin"]').click()
        time.sleep(6)
        self.browser.quit()


if __name__ == '__main__':
    login_url = 'https://mail.163.com/'
    email_account = '13273021913'
    email_password = 'el571987.@'
    login_email = LoginEmail()
    login_email.open_email(login_url)
    login_email.login(email_account,email_password)