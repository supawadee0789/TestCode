import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const ItemWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 15px;
`;
const Img = styled.Image`
  width: 140px;
  height: 200px;
  border-radius: 23px;
`;
const BodyText = styled.Text`
  color: white;
  font-size: 14px;
  margin: 5px 10px;
  text-align: left;
`;

const TextContent = styled.View`
  margin-left: 15px;
  margin-right: 40px;
  text-align: left;
  flex-shrink: 1;
`;

type Props = {
  title: String;
  imgURL: String;
  rate: String;
  date: String;
};
const MovieListItem: React.FC<Props> = props => {
  return (
    <ItemWrapper>
      <Img
        source={{
          uri: 'https://www.themoviedb.org/t/p/original' + props.imgURL,
        }}
      />
      <TextContent>
        <BodyText>{props.title}</BodyText>
        <BodyText>{'(' + props.date.split('-')[0] + ')'}</BodyText>

        <BodyText>
          <Icon name="star" color="#ffb300" size={20} />
          {'  ' + props.rate}
        </BodyText>
      </TextContent>
    </ItemWrapper>
  );
};

export default MovieListItem;
