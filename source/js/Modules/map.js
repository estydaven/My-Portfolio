
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 53.658348, lng: 23.786986},
        disableDefaultUI: true,
        scrollwheel: false,
        styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#4369aa"},{"visibility":"on"}]}]
    });

    var marker = new google.maps.Marker({
        icon: 'assets/img/map-contact.png',
        position: {lat: 53.658348, lng: 23.786986},
        map: map,
        title: "Я здесь!",
        animation: google.maps.Animation.BOUNCE
    });
}
