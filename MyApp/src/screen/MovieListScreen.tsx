import React, {Component, useCallback, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import styled from 'styled-components/native';
import MovieListItem from '../components/MovieListItem';
const screen_width = Dimensions.get('window').width;
const StyledText = styled.Text`
  font-size: 18px;
  color: white;
`;
const StyledView = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

type Props = {};

interface Movie {
  title: String;
  id: number;
  imgURL: String;
  rate: number;
  date: String;
}
const MovieListScreen: React.FC<Props> = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  let totalPages: number;
  const [alldata, setAllData] = useState<any[]>([]);
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=c1618550083ac39008a92222d9c8a6a9&language=en-US&page=1',
    )
      .then(response => response.json())
      .then(json => {
        setData(current => [...current, ...json.results]);
        totalPages = json.total_pages;
        // fetchData(totalPages);
        console.log('all : ' + data.length);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
    
  }, []);



const fetchData = useCallback(async(totalPages: number) =>    {{
    for (let i = 2; i <= totalPages; i++) {
      await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=c1618550083ac39008a92222d9c8a6a9&language=en-US&page=' +
          i.toString(),
      )
        .then(response => response.json())
        .then(json => {
          setData(current => [...current, ...json.results]);
        });
    }
  }  }, []);

  function formatMovie(movie: any): Movie {
    return {
      title: movie.item.title,
      id: movie.item.id,
      imgURL: movie.item.poster_path,
      rate: movie.item.vote_average,
      date: movie.item.release_date,
    };
  }
  return (
    <StyledView>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={item => {
          let movie: any = formatMovie(item);
          return (
            <MovieListItem
              title={movie.title}
              imgURL={movie.imgURL}
              date={movie.date}
              rate={movie.rate}
            />
          );
        }}
        onEndReached={()=>{
          console.warn('warn')
        }}
      />
    </StyledView>
  );
};

export default MovieListScreen;
