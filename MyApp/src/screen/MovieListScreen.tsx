import React, {Component, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, View, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import MovieListItem from '../components/MovieListItem';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=c1618550083ac39008a92222d9c8a6a9&language=en-US&page=' +
        page.toString(),
    )
      .then(response => response.json())
      .then(json => {
        setData(current => [...current, ...json.results]);
        setTotalPages(json.total_pages);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);
      });
    if (data.length >= 80) {
      data.splice(0, 60);
    }
  }, [page]);

  const renderFooter = () => {
    console.log(data.length);
    if (loading === false) {
      return null;
    } else {
      return (
        <View style={{height: 30, marginVertical: 15}}>
          <ActivityIndicator color={'#888'} size={50} />
        </View>
      );
    }
  };

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
        keyExtractor={(item, index) => index.toString()}
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
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (totalPages === 0) {
            setLoading(true);
          } else {
            if (page <= totalPages) {
              setPage(page + 1);
            } else {
              setPage(1);
            }
          }
        }}
        ListFooterComponent={renderFooter}
      />
    </StyledView>
  );
};

export default MovieListScreen;
