import './MapPage.scss';
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
import {getProfiles} from "../../utils/api";
import {useState} from "react";
import {BaseFiedsRaw, ShortProfileRaw, UserAccountRaw} from "../../services/types/types";

type TProfile = BaseFiedsRaw & UserAccountRaw & { profile: ShortProfileRaw };

const balloon = (student: TProfile) => {
  return `
      <div class= "balloon">
        <img class="imgBalloon" src = "${student.profile.photo}" alt="${student.profile.photo}">
        <div>
          <p class="balloonName">${student.profile.name}</p>
          <p class='balloonCity'>${student.profile.city.name}</p>
        <div>       
      </div>
    `
}

export const MapPage = () => {
  const [profiles, setProfiles] = useState<TProfile[]>([])

  const loadProfiles = async () => {
    const profiles = await getProfiles();
    setProfiles(profiles.items)
  }

  const onLoad = () => {
    loadProfiles().then().catch(err => {
      console.log(err);
  });
  }

  return <YMaps query={{lang: 'ru_RU'}}>
    <main className='map'>
      <Map defaultState={{center: [55.751574, 37.573856], zoom: 5}}
           style={{width: '100%', height: '100%'}}
           onLoad={onLoad}>

        {profiles.map((student) =>
          <Placemark
            key={student._id}
            geometry={student.profile.city.geocode}
            properties={{
              balloonContent: balloon(student),
            }}
            options={{
              iconLayout: 'default#image',
              iconImageHref: iconPlacemark,
              iconImageSize: [46, 52],
              balloonOffset: [14, 0],
              balloonMinHeight: 49,
              balloonMinWidth: 163
            }}
          />
        )}

        <SearchControl
          options={{
            position: {top: 8, left: 15},
            placeholderContent: 'Поиск мест и адресов',
          }}
        />

        <GeolocationControl options={{float: "right"}}/>

        <RouteEditor options={{float: "right"}}/>

        <RulerControl/>

        <TrafficControl/>

        <ZoomControl/>
      </Map>
    </main>
  </YMaps>
}
