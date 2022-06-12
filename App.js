import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [counter, setCounter] = useState('00:00:00');
  const [button, setButton] = useState('GO');
  const [last, setlast] = useState(null);

  function go() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;

      setButton('GO');
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }
        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setCounter(format);
      }, 100);
      setButton('PAUSE');
    }
  }
  function stop() {
    if (timer !== null){
      clearInterval(timer);
      timer = null;
    }

    setlast(counter);
    setCounter('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;
    setButton('GO');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <Text style={styles.title}>CRONO' S CLOCK</Text>

      <Image style={styles.cronoImg} source={require('./src/crono.png')} />
      <Text style={styles.cronoTimer}>{counter}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={go}>
          <Text style={styles.btnText}>{button}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={stop}>
          <Text style={styles.btnText}>STOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastArea}>
        <Text style={styles.lastText}>
          {last ? 'Last timing : ' + last : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: {
    color: '#f5f5f5',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 60,
  },
  cronoImg: {
    width: 250,
    height: 300,
    marginTop: 70,
  },
  cronoTimer: {
    color: '#f4f4f4',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    top: -140,
  },
  btnArea: {
    flexDirection: 'row',
    height: 40,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AEEF',
    borderRadius: 15 / 2,
    height: 40,
    margin: 17,
  },

  btnText: {
    color: '#f8f8f8',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'center',
  },
  lastArea: {
    marginTop: 50,
  },
  lastText: {
    color: '#f4f4f4',
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: '300',
  },
});
