import requests
import time
import json
from bs4 import BeautifulSoup


start = 0

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}
while start < 223_500:
    url = f"https://www.imdb.com/search/title/?user_rating=4,&count=250&title_type=feature&start={start}&ref_=adv_nxt"
    response = requests.get(url, headers=headers)
    movies = []
    soup = BeautifulSoup(response.content, "html.parser")
    print(f'parsing {start} - {start + 250}')
    for item in soup.select(".lister-item-content"):
        
        year = item.find('span', class_='lister-item-year').text.split(' ')
        year = year[1] if len(year) > 1 else year[0]
        year = year.strip('()-')

        actors = item.findAll('p')
        actors = actors[2].text.split('Stars:')[1].strip().split(',')
        actors = [actor.lstrip() for actor in actors] 
        
        title = item.find('a').text
        imdb_link = f"https://www.imdb.com{item.find('a')['href']}"

        rating = item.find('strong').text.strip()

        genres = item.find('span', class_='genre').text.strip()
        genres = genres.split(', ')
        genres = [genre.strip() for genre in genres]

        movie = {
            "title": title,
            "year": year,
            "actors": actors,
            "rating": rating,
            "imdb_link": imdb_link,
            "genres": genres
        }
        
        movies.append(movie)

    time.sleep(3)
    print('dumping bulk')
    with open(f'movies_{start}-{start+250}.json', 'w') as f:
        json.dump(movies, f)
        f.write('\n')

    print(f'dumped to movies_{start}-{start+250}.json')
    start += 250

print('finish')


