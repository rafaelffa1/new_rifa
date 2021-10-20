// import node modules
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box, Text, Image, Stack, Heading } from 'native-base';
import CountDown from 'react-native-countdown-component';
import {convertToSeconds} from '../../utils/utils';

export default class RaffleCard extends Component {
  render() {
    const {navigation, raffle, image} = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailOrder', raffle)}
        style={{
          backgroundColor: '#f4f3f5',
          marginBottom: 10,
          borderRadius: 10,
        }}>
        <Box shadow={2} rounded="lg" maxWidth="90%" style={{ marginTop: 10 }}>
          <Image
            source={{
              uri: image,
            }}
            alt="image base"
            resizeMode="cover"
            height={200}
            roundedTop="md"
          />

          {raffle.status === 1 && (
            <View style={{backgroundColor: 'yellow', padding: 10}}>
              <Text>Pendente de confirmação</Text>
            </View>
          )}

          {raffle.status === 2 && (
            <View style={{backgroundColor: 'green', padding: 10}}>
              <Text>Confirmado</Text>
            </View>
          )}

          {raffle.status === 5 && (
            <View style={{backgroundColor: 'gray', padding: 10}}>
              <Text>Finalizado</Text>
            </View>
          )}

          <Stack space={4} p={[4, 4, 8]}>
            <Text color="gray.400">Tempo de sorteio</Text>
            <CountDown
              until={convertToSeconds(raffle.tempo_sorteio)}
              onFinish={() => alert('finished')}
              size={20}
              running={false}
              timeLabels={{d: 'Dias', h: 'Horas', m: 'Minutos', s: 'Segundos'}}
            />
            <Heading size={['md', 'lg', 'md']} noOfLines={2}>
              {raffle?.titulo_rifa}
            </Heading>
            <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
              {raffle?.desc_rifa}
            </Text>
          </Stack>
        </Box>
      </TouchableOpacity>
    );
  }
}
