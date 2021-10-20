// import dependencies
import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import ImageView from 'react-native-image-view';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MAIcon from 'react-native-vector-icons/MaterialIcons';
import {getLinkImageRaffle} from '../../utils/utils';
import Button from '../../components/buttons/Button';

// import components
import {
  Heading5,
  Heading6,
  Subtitle1,
  Paragraph,
} from '../../components/text/CustomText';
const {width} = Dimensions.get('window');

// CheckoutB
export default class DetailOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffle: props.route.params,
      imageIndex: 0,
      isImageViewVisible: false,
      images: [],
    };
    this.constructorArrayImagens();
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  constructorArrayImagens = () => {
    const {raffle} = this.state;
    let images = [];
    raffle.imagem[0].forEach(raffleImagem => {
      if (raffleImagem !== '') {
        images.push({
          source: {
            uri: getLinkImageRaffle(raffleImagem),
          },
          title: 'Paris',
          width: 400,
          height: 800,
        });
      }
    });
    setTimeout(() => {
      this.setState({images});
    }, 500);
  };

  renderImagesRaffles = () => {
    const {images} = this.state;
    if (images.length !== 0) {
      return images.map((image, index) => (
        <TouchableOpacity
          key={image.title}
          onPress={() => {
            this.setState({
              imageIndex: index,
              isImageViewVisible: true,
            });
          }}>
          <Image
            style={{width, height: 300}}
            source={image.source}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ));
    }
    return <></>;
  };

  render() {
    const {isImageViewVisible, imageIndex, raffle, images} = this.state;
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar backgroundColor={'#3b5998'} barStyle="light-content" />
        <ScrollView>
          <ScrollView horizontal>{this.renderImagesRaffles()}</ScrollView>

          <View style={styles.bxContent}>
            <Heading5>{raffle.titulo_rifa}</Heading5>
            <View style={styles.bxInfoRaffle}>
              <View style={styles.bl1InfoRaffle}>
                <FAIcon name={'clock-o'} size={24} color={'darkgrey'} />
                <Text style={styles.fontBold}>Duração</Text>
                <Subtitle1>{raffle.tempo_sorteio}</Subtitle1>
              </View>
              <View style={styles.bl2InfoRaffle}>
                <MAIcon name={'attach-money'} size={24} color={'darkgrey'} />
                <Text style={styles.fontBold}>Valor da cota</Text>
                <Subtitle1>{raffle.valor}</Subtitle1>
              </View>
              {/* <View style={styles.bl3InfoRaffle}>
                <FAIcon name={'trophy'} size={24} color={'darkgrey'} />
                <Text style={styles.fontBold}>Ganhadores</Text>
                <Subtitle1>{raffle.quant_ganhadores}</Subtitle1>
              </View> */}
            </View>
            <View style={styles.pd10}>
              <Heading6>Descrição</Heading6>
              <Paragraph>{raffle.desc_rifa}</Paragraph>
            </View>
          </View>
          <View style={styles.bxButton}>
            <Button
              onPress={() => {}}
              borderRadius={4}
              color={'#3b5998'}
              small
              title="COMPRAR COTA"
              titleColor={'white'}
            />
          </View>

          <View style={styles.bxButton}>
            <Button
              onPress={() => {}}
              color={'green'}
              title="ACEITAR A RIFA"
              titleColor={'white'}
            />
          </View>
        </ScrollView>

        <ImageView
          glideAlways
          images={images}
          imageIndex={imageIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          onClose={() => this.setState({isImageViewVisible: false})}
          onImageChange={imageIndex => {
            this.setState({imageIndex});
          }}
        />
      </SafeAreaView>
    );
  }
}

// CheckoutB Styles
const styles = StyleSheet.create({
  space: {marginTop: 20, marginBottom: 20},
  pt16: {paddingTop: 16},
  titleContainer: {
    paddingHorizontal: 16,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  bxContent: {
    padding: 20,
  },
  bxInfoRaffle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ececec',
    borderRadius: 4,
    padding: 10,
  },
  bl1InfoRaffle: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  bl2InfoRaffle: {
    flex: 1,
    alignItems: 'center',
  },
  bl3InfoRaffle: {
    flex: 1,
    alignItems: 'center',
  },
  fontBold: {
    fontWeight: 'bold',
  },
  pd10: {
    padding: 10,
  },
  button: {
    width: '82%',
  },
  bxButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
