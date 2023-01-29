import requests
import csv
from bs4 import BeautifulSoup

# scrapes data from the niagara historical society website and saves to CSV. 
# ignores items without a date and only selects items with images

def scrape(page):
	base_url = "https://niagarahistorical.pastperfectonline.com/Search?search_criteria=*&onlyimages=true&page="
	res = requests.get(f"{base_url}{page}")
	if res.status_code != 200:
		print(f"page {page} not found")
		return None
	soup = BeautifulSoup(res.content, "html.parser")
	items = soup.find_all("div", class_="indvResultDetails")
	data = []
			
	for item in items:
		item_link = item.find("a")["href"]
		res = requests.get("https://niagarahistorical.pastperfectonline.com/" + item_link)
		soup = BeautifulSoup(res.content, "html.parser")
		image_link = soup.find("div", class_="largeImage").find("a").find("img")["src"]
		image_link = image_link.replace("/thumbs/", "/")
		details = {}
		for row in soup.find_all("tr"):
			category = row.find("td", class_="category").text.strip()
			display = row.find("td", class_="display").text.strip()
			details[category] = display
		date = details.get("Date", "")
		if not date:
			print("Item without date. Skipping...")
			continue
		headline = details.get("Name", "")
		media_caption = details.get("Object ID", "")
		text = details.get("Description", "")
		subjects = ", ".join([subject for subject in details.get("Subjects", "").split("\n") if subject.strip()])
		data.append([image_link, headline, media_caption, date, text, subjects])	
	return data

image_links = set()

with open("data-collection/data.csv", "a", newline="") as f:
	writer = csv.writer(f)
	if f.tell() == 0:
		writer.writerow(["Media", "Headline", "Media Caption", "Display Date", "Text", "Group"])
	page = 51
	while True:
		data = scrape(page)
		if not data:
			break
		for item in data:
			if item[0] in image_links:
				print("duplicate data. skipping...")
				continue
			print(f"scraped {len(image_links)} items | page {page} | {item[1]}")
			image_links.add(item[0])
			writer.writerow(item)
		page += 1