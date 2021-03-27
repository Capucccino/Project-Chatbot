# -*- coding: utf-8 -*-
"""Untitled3.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1MOmbqN3OfLVpGz6MwrQQ-4csoqlD59yx
"""

import pandas as pd
import numpy as np
from tqdm import tqdm



#import movie csv with description, and more than 10 user ratings
movies = pd.read_csv('hhe.csv', sep=',')#, index_col=0, names=['title', 'genres'], skiprows=1)
ratings = pd.read_csv('rating (1).csv', sep =',')


# movies preparation 
all_genres = set()
i=0
for index, row in movies.iterrows():
    i+=1
   
    if i<3000:
        genres_list = str(row['genre']).split(',')
        for gen in genres_list:
            all_genres.add(gen)

all_genres = list(all_genres)
len(all_genres)

print(all_genres)
all_genres.index('Drama')

anime_new_columns = ['anime_id', 'title', 'rating']+all_genres
print(len(anime_new_columns))
print(len(all_genres))
anime_new = pd.DataFrame(columns = anime_new_columns)
print(anime_new)
i=0
for index, row in movies.iterrows():
    i+=1
   
    if i<3000:
      (title, rating) = row['name'], row['rating']
      
      genres_vector = [0.0]*len(all_genres)
      genres_list = str(row['genre']).split(',')
      for g in genres_list:
        genres_vector[all_genres.index(g)] = 1.0
    
      list_to_append = [row['anime_id'], title, rating] + genres_vector
      dic = {anime_new_columns[i]: list_to_append[i] for i in range(len(list_to_append))} 
      anime_new = anime_new.append(dic, ignore_index=True)
ratings[ratings.user_id!=1499]
User= 1499
import random as ran
anime=[]
positionanime=[]
for i in range(3):
  print("selon ces 10 animes lequel tu préfère? \n choisit un index")
  for i in range(10):
    h=ran.randint(0,2998)
    print(str(i)+": " +(anime_new.iloc[h][1]))

    anime.append(anime_new.iloc[h][1])
  isgood=True
  while isgood:
    input1= int(input())
    if input1<10 and input1>0:
      isgood= False
    else:
      print("un index entre 1 et 10 svp")
  positionanime.append(h+input1)
positionanime
idanime=[]
for i in positionanime:
  idanime.append(anime_new.iloc[i][0]) 
h={'user_id':User,'anime_id':idanime[0],'rating':8}
h1={'user_id':User,'anime_id':idanime[1],'rating':8}
h2={'user_id':User,'anime_id':idanime[2],'rating':8}
ratings.append(h, ignore_index=True)
ratings.append(h1, ignore_index=True)
ratings.append(h2, ignore_index=True)


ratings['anime_id']=ratings['anime_id'].astype(int)
anime_new['anime_id']= anime_new['anime_id'].astype(int)

#normalise items (movies) vectors 
genres_df = anime_new.iloc[:,3:]


#normalise genres
genres_df_normalised = genres_df.div(genres_df.sum(axis=1), axis=0)


anime_new = pd.concat([anime_new.iloc[:,0:3], genres_df_normalised], axis=1, sort = False)

#anime dataframe

len(anime_new_columns)
result = pd.merge(   ratings,anime_new[anime_new_columns],on='anime_id')
result = result.drop(['title','rating_y'], axis=1)
users_columns = ['user_id']+all_genres
users_new = pd.DataFrame(columns = users_columns)
result.sort_values(['user_id', "anime_id"], ascending = (True, True))
for user_id in range(1,1501,1):
  #print(user_id)
  user = result[result['user_id'] == user_id]

  new_line = []
  for g in all_genres:
    tempo = user[["rating_x"]].multiply(user[g], axis="index")
    new_line.append(tempo.sum(axis = 0, skipna = True)[0])

  list_to_append = [user_id] + new_line
  line_lables = ['user_id'] + all_genres
  dic = {line_lables[i]: list_to_append[i] for i in range(len(list_to_append))} 
  users_new = users_new.append(dic, ignore_index=True)
def recommend_user(id):
	user = np.array(list(users_new.iloc[:,1:].iloc[id]))
	cos_list = []
	for i in range(0, anime_new['title'].size): # Try on 10 first movies
		movie = np.array(list(anime_new.iloc[:,3:].iloc[i]))
		dot = np.dot(user, movie)
		norm_user = np.linalg.norm(user)
		norm_movie = np.linalg.norm(movie)
		cos = dot / (norm_user * norm_movie)
		cos_list.append(cos)
	return cos_list
def top_recomendation(i):
  user_1 = recommend_user(i)
  top_movies = [i]

  for i in range(0,3):
    max_val = max(user_1)
    index = user_1.index(max_val)
    user_1[index] = -2
    top_movies.append(anime_new['title'][index])

  return top_movies
j=top_recomendation(1499)#enter your user id here.
print("nous vous recommendons les series suivantes: \n 1) "+j[1]+"\n 2) "+ j[2]+"\n 3) "+j[3])


