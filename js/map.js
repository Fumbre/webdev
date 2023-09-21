ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.7591, 37.60275904],
            zoom: 16,
            controls: []
        }),

        zoomControl = new ymaps.control.ZoomControl({
          options: {
              size: 'small',
              float: 'none',
              position: {
                  bottom: 200,
                  right: 10
              }
          }
        });

      myMap.controls.add(zoomControl);
  
        var myCircle = new ymaps.Circle([
            [55.7591, 37.60275904],
            10
        ],{
          balloonContent: "Шоурум №4 Леонтьевский переулок, дом 5/1",
          hintContent: "Леонтьевский переулок, дом 5/1"
        }, {
          fillColor: "#9D5CD0",
          strokeColor: "#9D5CD0",
          strokeOpacity: 1,
          strokeWidth: 1

        });

        var geolocationControl = new ymaps.control.GeolocationControl({
          options: {
            noPlacemark: true,
            position: {
              bottom: 150,
              right: 10
            }
          }
      });
      geolocationControl.events.add('locationchange', function (event) {
          var position = event.get('position'),
          
              locationPlacemark = new ymaps.Placemark(position);
      
          myMap.geoObjects.add(locationPlacemark);
          // Установим новый центр карты в текущее местоположение пользователя.
          myMap.panTo(position);
      });
      myMap.controls.add(geolocationControl);
      
      myMap.geoObjects.add(myCircle);
      myMap.behaviors.disable('scrollZoom');
    }









