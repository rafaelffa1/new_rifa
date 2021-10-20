import React, { Component } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  LayoutAnimation,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { context, selecionarTodasCategorias } from '../../service/app.service';

import Carousel from 'react-native-banner-carousel';

import SafeAreaView from '../../components/SafeAreaView';
import { Heading6 } from '../../components/text/CustomText';
import LinkButton from '../../components/buttons/LinkButton';
import getImgSource from '../../utils/getImgSource.js';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import RaffleCard from '../../components/cards/RaffleCard';
import { configImagens } from '../../utils/utils';
import { fetchRifasPageStatus } from '../../service/rifa.service';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 250;

// HomeB Config
const imgHolder = require('../../assets/img/imgholder.png');

// HomeB
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destaqueBanner: [],
      destaqueNormal: [],
      categorias: [],
      activityIndicatorModalVisible: true,
      rafflesUser: [],
    };
    this.page = 1;
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.fetchRafflesUser();
    navigation.addListener('focus', async () => {
      this.fetchRafflesUser();
    });
  }

  async fetchRafflesUser() {
    this.showActivityIndicatorModal();
    const rafflesUser = await fetchRifasPageStatus(this.page, 2);
    if (rafflesUser) {
      this.configImagesRaffles(rafflesUser);
    }

    const categorias = await selecionarTodasCategorias();
    this.setState({categorias});
    this.closeActivityIndicatorModal();
  }

  configImagesRaffles(rafflesUser) {
    rafflesUser.forEach(raffle => {
      raffle.imagem = configImagens(raffle.imagem);
    });
    this.setState({ rafflesUser });
  }

  closeActivityIndicatorModal = () => {
    this.setState({
      activityIndicatorModalVisible: false,
    });
  };

  showActivityIndicatorModal = () => {
    this.setState({
      activityIndicatorModalVisible: true,
    });
  };

  renderCategorias = () => {
    const { categorias } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}>
        {categorias?.map(categoria => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={categoria.ID}
            onPress={() => navigation.navigate('Category', categoria.ID)} >
            <View style={styles.categoryContainer}>
              <ImageBackground
                defaultSource={imgHolder}
                source={getImgSource(`${context}/img/${categoria.imagem}`)}
                style={styles.categoryThumbnail}
                imageStyle={styles.categoryImg}>
                <View style={styles.categoryName}>
                  <Text style={styles.categoryNameText}>
                    {categoria.nome_categoria}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  navigateTo = (screen, data = []) => {
    const { navigation } = this.props;
    navigation.navigate(screen, { data });
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    const { products } = this.state;
    const index = products.indexOf(item);

    if (quantity < 0) {
      return;
    }
    products[index].quantity = quantity;

    this.setState({
      products: [...products],
    });
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { products } = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState({
      products: [...products],
    });
  };

  keyExtractor = (item, index) => index.toString();

  onPressLocation = () => {
    console.warn('testeeeeee');
  };

  renderPage(destaque, index) {
    const { navigation } = this.props;
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate('Featured', destaque.ID)}
        key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: `${context}${destaque.imagem}` }}
        />
      </TouchableHighlight>
    );
  }

  renderDestaquesBanners = () => {
    const { destaqueBanner } = this.state;
    return (
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}>
        {destaqueBanner.map((destaque, index) =>
          this.renderPage(destaque, index),
        )}
      </Carousel>
    );
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  highlightImageRaffle(raffle) {
    return `${context}${raffle.imagem[0][0]}`;
  }

  render() {
    const { destaqueBanner, activityIndicatorModalVisible, rafflesUser } = this.state;
    const { navigation } = this.props;
    LayoutAnimation.easeInEaseOut();

    return (
      <NativeBaseProvider style={styles.screenContainer}>
        <SafeAreaView>
          <StatusBar backgroundColor={'#3b5998'} barStyle="light-content" />

          <ActivityIndicatorModal
            message="Por favor, aguarde um momento ..."
            onRequestClose={this.closeActivityIndicatorModal}
            title="Carregando"
            visible={activityIndicatorModalVisible}
          />

          <View>
            <ScrollView>
              {destaqueBanner.length !== 0 && this.renderDestaquesBanners()}
              <View style={styles.categoriesContainer}>
                <View style={styles.titleContainer}>
                  <Heading6 style={styles.titleText}>Categorias</Heading6>
                  {/* <LinkButton
                  title="Ver todos"
                  titleStyle={styles.viewAllText}
                  onPress={this.navigateTo('Categories')}
                /> */}
                </View>

                {this.renderCategorias()}
              </View>

              <View>
                <View style={styles.titleContainer}>
                  <Heading6 style={styles.titleText}>
                    Rifas que estão rolando
                  </Heading6>
                  <LinkButton
                    title="Ver todos"
                    titleStyle={styles.viewAllText}
                    onPress={this.navigateTo('Categories')}
                  />
                </View>

                <View style={{justifyContent: 'center', alignItems:'center'}}>
                  {rafflesUser &&
                    rafflesUser?.map(raffle => {
                      return (
                        <RaffleCard
                          raffle={raffle}
                          image={this.highlightImageRaffle(raffle)}
                          navigation={this.props.navigation}
                        />
                      );
                    })}
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }

  static navigationOptions = {
    headerTitle: (
      <View>
        <View>
          <Text>version 2.03</Text>
        </View>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#5073C4',
      elevation: 0,
      borderBottomWidth: 0,
    },
  };
}

// HomeB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  titleText: {
    fontWeight: '700',
  },
  viewAllText: {
    color: '#1b0cab',
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 6,
  },
  categoryContainer: {
    marginLeft: 10,
    width: 112,
    height: 62,
  },
  categoryThumbnail: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  categoryImg: {
    borderRadius: 8,
  },
  categoryName: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryNameText: {
    fontWeight: '700',
    color: '#FAFAFA',
    letterSpacing: 0.6,
  },
})