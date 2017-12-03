
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;

function getPosTop(i,j){
  return cellSpace +(cellSideLength+cellSpace)*i;
}

function getPosLeft(i,j){
  return cellSpace +(cellSideLength+cellSpace)*j;
}

//设置背景色
function getNumberBackgroundColor(number){
  switch(number){
    case 2:return "#eee4da";break;
    case 4:return "#ede0c8";break;
    case 8:return "#f2b179";break;
    case 16:return "#f59563";break;
    case 32:return "#f67c5f";break;
    case 64:return "#f65e3b";break;
    case 128:return "#edcf72";break;
    case 256:return "#edcc61";break;
    case 512:return "#9c0";break;
    case 1024:return "#33b5e5";break;
    case 2048:return "#09c";break;
    case 4096:return "#a6c";break;
    case 8192:return "#93c";break;
  }
  return "black";
}

//设置文字的Color
function getNumberColor(number){
  if(number <=4){
    return "#776e65";
  }
  return "#f9F6F2";
}

//没有nospace 空间生成
function nospace(board){
  for(var i=0; i<4; i++){
    for(var j=0; j<4; j++){
      if(board[i][j] ==0){
        return false;
      }
    }
  }
  return true;
}
// 无法移动 nomove
function nomove(board){
  if(canMoveLeft(board) ||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){
    return false;
  }
  return true;
}

//判断是否可以左移动
//1判断左边12个的数字格是否有数字存在
//2 判断左边的数字是否与自己相等
function canMoveLeft(board){
  for(var i=0; i<4; i++){
    for(var j=1; j<4; j++){
      if(board[i][j] !=0){
        if(board[i][j-1] ==0 || board[i][j-1] ==board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}
//判断是否可以向右移动
function canMoveRight(board){
  for(var i=0; i<4; i++){
    for(var j=2; j>=0; j--){
      if(board[i][j] !=0){
        if(board[i][j+1] ==0||board[i][j+1] ==board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}
//判断是否可以向上移动
function canMoveUp(board){
  for(var i=1; i<4; i++){
    for(var j=0;j<4; j++){
      if(board[i][j] !=0){
        if(board[i-1][j] ==0||board[i-1][j] ==board[i][j]){
          return true;
        }
      }
    }
  }
  return false;
}

//判断是否可以向下移动
function canMoveDown(board){
  for(var i=2; i>=0; i--){
    for(var j=0;j<4; j++){
      if(board[i+1][j] ==0||board[i+1][j] ==board[i][j]){
        return true;
      }
    }
  }
  return false;
}
//noBlockHorizontal   判断是否 在水平文字 移动有障碍
function noBlockHorizontal(row,col1,col2,board) { //i , j ,k ,board
  for(var i=col1+1; i<col2; i++){
    if(board[row][i] != 0){
      return false;
    }
  }
  return true;
}
//noBlockHorizontal   判断是否 在垂直文字 移动有障碍
function noBlockVertical(col,row1,row2, board){//j,k,i,board
  for(var i=row1+1; i<row2;i++){
    if(board[i][col] !=0){
      return false;
    }
  }
  return true;
}
