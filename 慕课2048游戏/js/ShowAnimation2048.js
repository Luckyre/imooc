//展示
function showNumberWithAnimation(i,j,randNumber){

  var numberCell =$("#number-cell-"+i+'-'+j);
  numberCell.css("background-color",getNumberBackgroundColor(randNumber));//执行获取背景色
  numberCell.css("color",getNumberColor(randNumber));
  numberCell.text(randNumber);
//产生随机数之后的变化
  numberCell.animate({
    width:cellSideLength+'px',
    height:cellSideLength+'px',
    top:getPosTop(i,j),
    left:getPosLeft(i,j)
  },50);
}



// 执行 i.j位置到 i.k位置的移动动画
function showMoveAnimation(fromx,fromy, tox,toy){
  var numberCell =$('#number-cell-'+fromx+'-'+fromy);
  //设置 numberCell的样式
  numberCell.animate({
    top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy)
  },200);
}

function updateScore(score){
  $("#score").text(score);
}
