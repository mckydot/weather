$("#datepicker").datepicker({
    dateFormat: "yymmdd",
    minDate: "-1d",
    maxDate: "d",
});
$("#datepicker").datepicker("setDate", new Date())

let initDate = $("#datepicker").val();

$('form').submit(() => {
    let tDate = $("#datepicker").val();
    weather(tDate)
})

function weather(initDate) {
    console.log(initDate)
    $.ajax({
        url: `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=IM6iKcn3sotn%2By7YcHyLRBfOq%2BpdogyWQDeWhOCXFavKiEvVRudIWCfeQFLw%2FFX79gcX0hmYJ23R%2BoVMVjjjrw%3D%3D&pageNo=1&numOfRows=1000&dataType=Json&base_date=${initDate}&base_time=0500&nx=67&ny=100`,
        success: function (result) {
            console.log(result)
            let items = result.response.body.items.item;

            /*
            let filteredItems = [];

            for(let i=0; i<items.length; i++){
                if(items[i].category == 'TMP'){
                    filteredItems.push(items[i]);
                    console.log(filteredItems)
                }
            }*/

            let filteredItems = items.filter(item => {
                return item.category == 'TMP';
            });
            makeTable(filteredItems)
        },
    });
} //날씨 조회후 테이블 생성

function makeTable(src) {
    let tableHTML = '';
    src.forEach(item => {
        tableHTML= tableHTML + `
            <tr>
                <td>${item.fcstDate}</td>
                <td>${item.fcstTime}</td>
                <td>${item.fcstValue}</td>
            </tr>`
    }); //api에서 받아온 값 HTML의 tabe태그에 표시하기
    $('table tbody').html(tableHTML);
}

function button1_click() {
	console.log("버튼1을 누르셨습니다.");
    location.href='./maker_information.html'
}