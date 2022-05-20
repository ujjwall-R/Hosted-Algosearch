import time
from selenium import webdriver
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome(ChromeDriverManager().install())
urls = ["https://www.codechef.com/problems/XYSTR",
        "https://www.codechef.com/problems/SUBINC"]
cnt = 0
for url in urls:
    driver.get(url)
    cnt += 1
    time.sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    problem_text = soup.find('div', {"class": "problem-statement"}).get_text()
    # print(problem_text)
    problem_text = problem_text.encode("utf-8")
    problem_text = str(problem_text)
    with open("problem"+str(cnt)+".txt", "w+") as f:
        f.write(problem_text)
