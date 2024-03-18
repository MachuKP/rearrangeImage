import {useEffect, useState} from 'react';
import {
  Image,
  // ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MARGIN, SIZE} from '../Config';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

interface TileProps {
  // uri: ImageSourcePropType;
  uri: string;
  id: string;
  onLongPress: () => void;
}

const Tile = ({uri, id}: TileProps) => {
  const [path, setPath] = useState<{uri: string}>();
  useEffect(() => {
    const setBase64 = async () => {
      const base64 = await RNFS.readFile(uri, 'base64');
      if (uri.split('.').pop() === 'pdf') {
        setPath({uri: `data:application/pdf;base64,${base64}`});
      }
    };

    setBase64();
  }, [uri]);

  return (
    <View style={styles.tileContainer} pointerEvents="none">
      {path ? (
        <>
          <Pdf singlePage source={path} style={styles.pdf} />
          <View style={styles.textContainer}>
            <Text style={styles.textCover}>{id}</Text>
          </View>
        </>
      ) : (
        <>
          <Image
            style={styles.image}
            source={require('../assets/image001.jpg')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textCover}>{id}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    width: SIZE,
    height: SIZE,
  },
  image: {
    width: SIZE - MARGIN * 2,
    height: SIZE - MARGIN * 2,
    resizeMode: 'cover',
    borderRadius: MARGIN,
  },
  pdf: {
    borderRadius: MARGIN,
    width: SIZE - MARGIN * 2,
    height: SIZE - MARGIN * 2,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: SIZE - MARGIN * 2,
    paddingVertical: 3,
    borderBottomRightRadius: MARGIN,
    borderBottomLeftRadius: MARGIN,
  },
  textCover: {
    textAlign: 'center',
  },
});

export default Tile;
