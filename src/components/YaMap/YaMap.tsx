import './YaMap.scss';
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  GeolocationControl,
  RouteEditor,
  RulerControl,
  TrafficControl,
  ZoomControl
} from '@pbe/react-yandex-maps';
import iconPlacemark from '../../images/YaMap/Placemark.svg';
import avatar from '../../images/YaMap/avatar.png';

export default function YaMap() {

  return (
    <YMaps query={{ lang: 'ru_RU' }}>
      <main className='map'>
        <Map defaultState={{ center: [55.751574, 37.573856], zoom: 5 }} style={{ width: '100%', height: '100%' }}>

          <Placemark
            geometry={[55.684758, 37.738521]}
            properties={{
              balloonContent: `<div class= "balloon"><img class="imgBalloon" src = "${avatar}"></img><div><p class="balloonName">Шреков Шрек</p><p class='balloonCity'>Москва</p><div></div>`,
              
            }}
            options={{
              iconLayout: 'default#image',
              iconImageHref: iconPlacemark,
              iconImageSize: [46, 52],
              openEmptyBalloon: true,
              balloonOffset: [14, 0],
              balloonMinHeight: 49,
              balloonMinWidth: 163
            }}
          />

          <SearchControl
            options={{
              position: { top: 8, left: 15 },
              placeholderContent: 'Поиск мест и адресов',
            }}
          />

          <GeolocationControl options={{ float: "right" }} />

          <RouteEditor options={{ float: "right" }} />

          <RulerControl />

          <TrafficControl />

          <ZoomControl />
        </Map>
      </main>
    </YMaps>
  )
}