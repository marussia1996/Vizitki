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
//FIXME Тестовый аватар, надо будет заменить на данные с сервера
import avatar from '../../images/YaMap/avatar.png';
//FIXME Тестовые данные, надо будет заменить на данные с сервера
import { data } from './data';

export default function YaMap() {
  return (
    <YMaps query={{ lang: 'ru_RU' }}>
      <main className='map'>
        <Map defaultState={{ center: [55.751574, 37.573856], zoom: 5 }} style={{ width: '100%', height: '100%' }}>

          {data.map((student, i) => {
            return (
              <Placemark
                geometry={student.geometry}
                properties={{
                  balloonContent: `<div class= "balloon"><img class="imgBalloon" src = "${avatar}"></img><div><p class="balloonName">${student.name}</p><p class='balloonCity'>${student.city}</p><div></div>`,

                }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: iconPlacemark,
                  iconImageSize: [46, 52],
                  balloonOffset: [14, 0],
                  balloonMinHeight: 49,
                  balloonMinWidth: 163
                }}
                key={i}
              />
            )
          })}

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