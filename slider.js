$(document).ready(function(){
    var index = 0;
    var images = $(".slider img");
    var maxIndex = images.length - 1;

    function showImage() {
        images.hide().eq(index).show();
    }

    function nextImage() {
        index = index === maxIndex ? 0 : index + 1;
        showImage();
    }

    function prevImage() {
        index = index === 0 ? maxIndex : index - 1;
        showImage();
    }

    $(".slider img").not(":first").hide(); // Скрыть все изображения кроме первого
    setInterval(nextImage, 6000); // Автоматическое переключение изображений каждые 3 секунды

    $(".next").click(nextImage); // Обработчик события клика на кнопку "Вперед"
    $(".prev").click(prevImage); // Обработчик события клика на кнопку "Назад"
});