from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import pymysql
 
driver = webdriver.Chrome()
driver.get('https://www.ticketline.rs/svi-dogadjaji')
 
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
soup = BeautifulSoup(html_text, 'lxml')
cards = soup.find_all('section', class_='horizontal-card card__animation-container aspect-[200/200]')
print(f"{len(cards)} događaja pronađeno.")
 
for card in cards:
    try:
        date_tag = card.find('p')
        date = date_tag.text.strip() if date_tag else None
 
        title = card.find('h4').text.strip()
 
        all_p = card.find_all('p')
        location = all_p[1].text.strip() if len(all_p) > 1 else None
 
        cursor.execute('''
            INSERT INTO events (title, location, date) VALUES (%s, %s, %s)
        ''',(title, location, date))
    except Exception as e:
        print("Greška pri parsiranju jednog događaja:", e)
 
conn.commit()
conn.close()