from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import pymysql

driver = webdriver.Chrome()
driver.get('https://tickets.efinity.rs/')

conn = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="laraveldomaci"
)
print("Connection successful!")
cursor = conn.cursor()

html_text = driver.page_source
driver.quit()

soup = BeautifulSoup(html_text, 'lxml')
events = soup.findAll('div', class_='card-body card-body-custom')
for event in events:
    title=event.find('h1').text.strip()
    location=event.find('span').text.strip()
    h3_tag=event.find('h3')
    if h3_tag is not None:
        date = h3_tag.text.strip()
        cursor.execute('''
            INSERT INTO events (title, location, date) VALUES (%s, %s, %s)
        ''', (title, location, date))
        print(title)
        print(location)
        print(date)
        print()
conn.commit()
conn.close()












