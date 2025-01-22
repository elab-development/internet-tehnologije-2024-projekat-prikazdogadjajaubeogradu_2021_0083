from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import pymysql

driver = webdriver.Chrome()
driver.get('https://www.ticketline.rs/listeventsbycat/?cat=all/')

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
events = soup.findAll('div', class_='main')
for event in events:
    title=event.find('h4').text.strip()
    location=event.find('h5').text.strip()
    h3_tag=event.find('span')
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
