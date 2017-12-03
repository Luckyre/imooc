var board = new Array();
var scare =0;
var hasConflicted =new Array(); //设置的当移动过程中的碰撞

var startx =0;
var starty =0;
var endx =0;
var endy =0;

$(document).ready(function(){
  prepareForMobile();
  newGame();
});

//移动端适配
function prepareForMobile(){

  if(documentWidth >500){
    gridContainerWidth =500;
    cellSpace =20;
    cellSideLength=100;
  }

  $("#grid-container").css("width",gridContainerWidth-2*cellSpace);
  $("#grid-container").css("height",gridContainerWidth-2*cellSpace);
  $("#grid-container").css("padding",cellSpace);
  $("#grid-container").css("border-radius",0.02*gridContainerWidth);

  $(".grid-cell").css("width",cellSideLength);
  $(".grid-cell").css("height",cellSideLength);
  $(".grid-cell").css("border-radius",0.02*cellSideLength);
}

function newGame(){
  //初始化棋盘格
  init();
  //在随机两个格子上生成数字
  generateOneNumber();
  generateOneNumber();
}

function init(){
  for(var i=0; i<4; i++){
    for(var j=0; j<4; j++){
      var gridCell =$('#grid-cell-'+i+'-'+j);
      gridCell.css('top',getPosTop(i,j));
      gridCell.css('left',getPosLeft(i,j));
    }
  }
    //将board设置为二维数组，并且初始化
    for(var i=0;i<4; i++){
      board[i] =new Array();
      hasConflicted[i] =new Array();
      for(var j=0; j<4;j++){
        board[i][j] =0;
        hasConflicted[i][j] =false;  //初始化过程中每一个位置度没有进行过碰撞
      }
    }


  //初始化完成调用
  updateBoardView();

  score =0;

}

function updateBoardView(){
    $('.number-cell').remove();
    for(var i=0; i<4; i++){
      for(var j=0; j<4; j++){
        $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
        var theNumberCell =$('#number-cell-'+i+'-'+j);

        if(board[i][j] == 0){
          theNumberCell.css('width','0px');
          theNumberCell.css('height','0px');
          theNumberCell.css('top',getPosTop(i,j) +cellSideLength/2);
          theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
        }else{
          theNumberCell.css('width',cellSideLength);
          theNumberCell.css('height',cellSideLength);
          theNumberCell.css('top',getPosTop(i,j));
          theNumberCell.css('left',getPosLeft(i,j));
          theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
          theNumberCell.css('color',getNumberColor(board[i][j]));
          theNumberCell.text(board[i][j]);
        }
        hasConflicted[i][j] =false;
      }
    }

    $(".number-cell").css('line-height',cellSideLength+'px');
    $(".number-cell").css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
    if(nospace(board)){
      return false;
    }

    //随机生成一个位置
    var randx =parseInt(Math.floor(Math.random()*4) );
    var randy =parseInt(Math.floor(Math.random()*4) );

    var times =0; //优化生成的随机位置
    while(times<50){
      if(board[randx][randy] ==0){
        break;
      }
      //如果没有查找到 继续查找下一个位置
      randx =parseInt(Math.floor(Math.random()*4));
      randy =parseInt(Math.floor(Math.random()*4));

      times++;
    }

    //循环50次都没有生成，人工手动生成
    if(times ==50){
      for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(board[i][j] ==0){
              randx =i;
              randy =j;
            }
        }
      }
    }

    //随机生成一个数字
    var randNumber =Math.random() <0.5?2:4;
    //在随机的位置显示随机的数字
    board[randx][randy] =randNumber; //将生成的随机数赋值给变量
    showNumberWithAnimation(randx,randy,randNumber); //执行动画的效果
    return true;
}

//实现 游戏的逻辑
/*
*/

// 实现控制键盘事件
$(document).keydown(function(event){


   switch(event.keyCode){ //判断事件的keyCode值
    case 37:
    event.preventDefault(); //阻止默认事件传递  可以清除滚动条的因为上下键的滚动而滚动
      if(moveLeft()){
        //判断如果可以执行向左边移动的函数
        //延迟执行
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
      break;
    case 38:   //上键的keycode值
    event.preventDefault();
      if(moveUp()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    break;
    case 39:
    event.preventDefault();
    if(moveRight()){
      setTimeout("generateOneNumber()",210);
      setTimeout("isgameover()",300);
    }
    break;
    case 40:
    event.preventDefault();
    if(moveDown()){
      setTimeout("generateOneNumber()",210);
      setTimeout("isgameover()",300);
    }
    break;
   }
});

document.addEventListener("touchstart",function(event){
   startx = event.touches[0].pageX;
   starty = event.touches[0].pageY;
});

// 兼容一个 android 中无法点击的bug
// document.addEventListener("touchmove",function(event){
//   event.preventDefault();
// })

document.addEventListener("touchend",function(event){
  endx = event.changedTouches[0].pageX;
  endy = event.changedTouches[0].pageY;

  var deltax = endx- startx;
  var deltay =endy - starty;

//当用户只是点击时也会产生deltax，deltay的值，所以应该判断其值的大小
if(Math.abs(deltax)<0.3*documentWidth &&Math.abs(deltay)<0.3*documentWidth){
  return;
}

  if(Math.abs(deltax)>=Math.abs(deltay)){
      if(deltax >0){
        //moveRight
        if(moveRight()){
          setTimeout("generateOneNumber()",210);
          setTimeout("isgameover()",300);
        }
      }else{
          //moveLeft
          if(moveLeft()){
            setTimeout("generateOneNumber()",210);
            setTimeout("isgameover()",300);
          }
      }

  }else{
    if(deltay >0){
      //moveDown
      if(moveDown()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }else{
        //moveUp
        if(moveUp()){
          setTimeout("generateOneNumber()",210);
          setTimeout("isgameover()",300);
        }
    }

  }
});

//判断游戏是否结束
function isgameover(){
  if(nospace(board) && nomove(board)){ // 若没有空间的或者无法移动的
     gameover();
  }
}
//momove 无法移动
function gameover(){
  alert("Game over!");
}

function moveLeft(){
  // 当执行moveLef()  需要判断
   if(!canMoveLeft(board)){
     return false;
   }
   //当 canMoveLeft 返回 true时，执行真正的向左移动的逻辑
   //对每一个数字的左侧位置进行判断。看是否可能为落脚点
    /*
      落脚位置是否为空
      落脚位置数字和待定元素是否相等
      移动的路径中是否存在障碍物
    */
   //moveLeft 执行
   for(var i=0;i<4; i++){
    for(var j=1; j<4; j++){
        if(board[i][j] !=0){  //判断除了第一列的数字格不遍历，其他的遍历查找是否存在元素
          for(var k =0; k<j; k++){
            //判断k 到j之间的过程中  是否有障碍物  是否为空  或者 【判断是否移动的元素刚好与那个位置的元素相等
              if(board[i][k] ==0 &&noBlockHorizontal(i,k ,j,board)){
                //执行 move
                showMoveAnimation(i,j,i,k); // 执行 i.j位置到 i.k位置的移动动画
                 board[i][k] =board[i][j];
                 board[i][j] =0;  //执行完 之后为空
                continue;
              }else if(board[i][k] ==board[i][j]&&noBlockHorizontal(i,k ,j,board) && !hasConflicted[i][k]){
                //执行 move
                showMoveAnimation(i,j,i,k); //  执行 i.j位置到 i.k位置的移动动画
                //增加 数字
                board[i][k] +=board[i][j];
                board[i][j] =0;

                //当执行了这个数字的叠加之后，就会有分数的叠加  add Score
                score += board[i][k];
                updateScore(score);

                hasConflicted[i][k] =true;
                continue;
              }
          }
        }
    }
   }
   setTimeout("updateBoardView()",200);  //执行在showMoveAnimation动画之后
   return true;
}

//当 moveRight 返回 true时，执行真正的向右移动的逻辑
function moveRight(){
  if(!canMoveRight(board)){
      return false;
  }
  //moveRight
  for(var i=0; i<4; i++){
    for(var j=2; j>=0; j--){
      if(board[i][j] !=0){
        for(var k=3;k>j; k--){
            if(board[i][k] ==0&& noBlockHorizontal(i,j,k,board)){
              showMoveAnimation(i,j,i,k);
              board[i][k] =board[i][j];
              board[i][j] =0;
              continue;
            }else if(board[i][k] == board[i][j] &&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
                showMoveAnimation(i,j,i,k);
                // addnumber
                board[i][k] *=2;
                board[i][j] =0;

                //当执行了这个数字的叠加之后，就会有分数的叠加  add Score
                score +=board[i][k];
                updateScore(score);

                hasConflicted[i][k] =true;
                continue;
            }
        }
      }
    }

  }
  setTimeout("updateBoardView()",200);
  return true;
  }


function moveUp(){
  if(!canMoveUp(board)){
    return false;
  }

  //moveUp
  for(var i=1;i<4;i++){
    for(var j=0;j<4;j++){
       if(board[i][j] !=0){
         for(var k=0; k<i; k++){
           if(board[k][j] ==0 &&noBlockVertical(j,k,i,board)){
             showMoveAnimation(i,j,k,j);
             board[k][j] =board[i][j];
             board[i][j] =0;
             continue;
           }
           else if(board[k][j] ==board[i][j] &&noBlockVertical(j,k,i,board)&&hasConflicted[k][j]){
             showMoveAnimation(i,j,k,j);
             board[k][j] *=2;
             board[i][j] =0;

             //当执行了这个数字的叠加之后，就会有分数的叠加  add Score
             score +=board[k][j];
             updateScore(score);

             hasConflicted[k][j] =true;
             continue;
           }
         }
       }
    }
  }
  setTimeout("updateBoardView()",200);
  return false;
}

function moveDown(){
    if(!canMoveDown(board)){
      return false;
    }
    //moveDown
  for(var i=2; i>=0; i--){
    for(var j=0; j<4; j++){
      if(board[i][j]!= 0){
          for(var k=3; k>i; k--){
            if(board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
               showMoveAnimation( i , j , k , j );
              board[k][j] =board[i][j];
              board[i][j] =0;
              continue;
            }else if(board[k][j] ==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
              showMoveAnimation(i,j,k,j);
              board[k][j] *=2;
              board[i][j] =0;

              //当执行了这个数字的叠加之后，就会有分数的叠加  add Score
              score +=board[k][j];
              updateScore(score);

              hasConflicted[k][j] =true;
              continue;
            }
          }
      }
    }
  }

    setTimeout("updateBoardView()",200);
    return true;
}
