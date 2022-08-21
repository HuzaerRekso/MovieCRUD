import React, {useEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import Parse from 'parse/react-native';
import {
  Button as PaperButton,
  Button,
  List,
  Text as PaperText,
  TextInput as PaperTextInput,
  Title,
} from 'react-native-paper';

export const MovieList = () => {
  const [readResults, setReadResults] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');

  const createMovie = async function () {
    const newMovieTitleValue = movieTitle;
    let MovieJournal = new Parse.Object('MovieJournal');
    MovieJournal.set('title', newMovieTitleValue);
    MovieJournal.set('done', false);
    try {
      await MovieJournal.save();
      Alert.alert('Success!', 'Movie created!');
      readMovies();
      return true;
    } catch (error) {
      Alert.alert('Error!', error.message);
      return false;
    }
  };

  const readMovies = async function () {
    const parseQuery = new Parse.Query('MovieJournal');
    try {
      let movies = await parseQuery.find();
      setReadResults(movies);
      return true;
    } catch (error) {
      Alert.alert('Error!', error.message);
      return false;
    }
  };

  const updateMovie = async function (movieId, done) {
    let Movie = new Parse.Object('MovieJournal');
    Movie.set('objectId', movieId);
    Movie.set('done', done);
    try {
      await Movie.save();
      Alert.alert('Success!', 'Movie updated!');
      readMovies();
      return true;
    } catch (error) {
      Alert.alert('Error!', error.message);
      return false;
    }
  };

  const deleteMovie = async function (movieId) {
    let Todo = new Parse.Object('MovieJournal');
    Todo.set('objectId', movieId);
    try {
      await Todo.destroy();
      Alert.alert('Success!', 'Movie deleted!');
      readMovies();
      return true;
    } catch (error) {
      Alert.alert('Error!', error.message);
      return false;
    }
  };

  useEffect(() => {
    readMovies();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#208AEC" />
      <SafeAreaView style={Styles.container}>
        <View style={Styles.header}>
          <Image
            style={Styles.header_logo}
            source={require('../assets/outline_live_tv_white_48pt_3x.png')}
          />
          <PaperText style={Styles.header_text_bold}>
            {'Note Your Movie List'}
          </PaperText>
          <PaperText style={Styles.header_text}>{'Movie Journal'}</PaperText>
        </View>
        <View style={Styles.wrapper}>
          <View style={Styles.flex_between}>
            <Title>Movie List</Title>
            <Button
              icon={require('../assets/baseline_refresh_black_24pt_1x.png')}
              color={'#208AEC'}
              onPress={() => readMovies()}
            />
          </View>
          <View style={Styles.create_todo_container}>
            <PaperTextInput
              value={movieTitle}
              onChangeText={text => setMovieTitle(text)}
              label="New Movie"
              mode="outlined"
              style={Styles.create_todo_input}
            />
            <PaperButton
              onPress={() => createMovie()}
              mode="contained"
              icon={require('../assets/baseline_add_circle_outline_black_24pt_1x.png')}
              color={'#208AEC'}
              style={Styles.create_todo_button}>
              {'Add'}
            </PaperButton>
          </View>
          <ScrollView>
            {readResults !== null &&
              readResults !== undefined &&
              readResults.map(movie => (
                <List.Item
                  key={movie.id}
                  title={movie.get('title')}
                  titleStyle={
                    movie.get('done') === true
                      ? Styles.todo_text_done
                      : Styles.todo_text
                  }
                  style={Styles.todo_item}
                  right={props => (
                    <>
                      {movie.get('done') !== true && (
                        <TouchableOpacity
                          onPress={() => updateMovie(movie.id, true)}>
                          <List.Icon
                            {...props}
                            icon={require('../assets/baseline_done_black_24pt_1x.png')}
                            color={'#4CAF50'}
                          />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity onPress={() => deleteMovie(movie.id)}>
                        <List.Icon
                          {...props}
                          icon={require('../assets/baseline_clear_black_24pt_1x.png')}
                          color={'#ef5350'}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                />
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#208AEC',
  },
  header_logo: {
    width: 170,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  header_text_bold: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header_text: {
    marginTop: 3,
    color: '#fff',
    fontSize: 14,
  },
  flex_between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  create_todo_container: {
    flexDirection: 'row',
  },
  create_todo_input: {
    flex: 1,
    height: 38,
    marginBottom: 16,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  create_todo_button: {
    marginTop: 6,
    marginLeft: 15,
    height: 40,
  },
  todo_item: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  },
  todo_text: {
    fontSize: 15,
  },
  todo_text_done: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
});
