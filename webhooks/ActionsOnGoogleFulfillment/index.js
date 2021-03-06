const { conversation } = require('@assistant/conversation');
const functions = require('firebase-functions');

const app = conversation();

app.handle('gotime', conv => {
  const nowtime = new Date();

  hour = (nowtime.getHours() + 9) % 24;
  minute = nowtime.getMinutes();
  weekend = nowtime.getDay();
  if (weekend == 6 || weekend == 0) {
    text = "weekend";
  }
  else {
    if (hour < 8) {
      text = "08:10";
      left = (8 - hour) * 60 + 10 - minute;
    }
    else if (hour == 8) {
      if (minute < 10) {
        text = "08:10";
        left = 10 - minute;
      }
      else if (minute < 20) {
        text = "08:20";
        left = 20 - minute;
      }
      else if (minute < 30) {
        text = "08:30";
        left = 30 - minute;
      }
      else if (minute < 40) {
        text = "08:40";
        left = 40 - minute;
      }
      else if (minute < 50) {
        text = "08:50";
        left = 50 - minute;
      }
      else {
        text = "09:00";
        left = 60 - minute;
      }
    }
    else if (hour == 9) {
      if (minute < 30) {
        text = "09:30";
        left = 30 - minute;
      }
      else if (minute < 50) {
        text = "09:50";
        left = 50 - minute;
      }
      else {
        text = "10:00";
        left = 60 - minute;
      }
    }
    else if (hour == 10) {
      if (minute < 30) {
        text = "10:30";
        left = 30 - minute;
      }
    }
    else if (hour == 11) {
      text = "12:20";
      left = (12 - hour) * 60 + 20 - minute;
    }
    else if (hour == 12) {
      if (minute < 20) {
        text = "12:20";
        left = 20 - minute;
      }
      else {
        text = "stop";
      }
    }
    else {
      text = "stop";
    }
  }
  if (text == "stop") {
    text = "오늘은 안심역 등교버스 운행이 종료되었습니다.";
  }
  else if (text == "weekend") {
    text = "주말에는 등교버스 운행을 하지 않습니다.";
  }
  else {
    text = "다음 버스시간은 " + text + "입니다.\n"+"남은 시간은 "+left+"분 입니다.";
  }
  conv.add(text + "\n전체 안심역 등교 버스 시간표를 보려면 시간표라고 말씀해주세요.");
});

app.handle('backtime', conv => {
  const nowtime = new Date();

  hour = (nowtime.getHours() + 9) % 24;
  minute = nowtime.getMinutes();
  weekend = nowtime.getDay();
  if (weekend == 6 || weekend == 0) {
    text = "weekend";
  }
  else {
  if (hour < 16) {
    text = "오후 4:00";
    left = (16 - hour) * 60 + 40 - minute;
  }
  else if (hour == 16) {
    if (minute < 15) {
      text = "오후 4:15";
      left = 15 - minute;
    }
    else if (minute < 30) {
      text = "오후 4:30";
      left = 30 - minute;
    }
    else if (minute < 45) {
      text = "오후 4:45";
      left = 45 - minute;
    }
    else {
      text = "오후 5:00";
      left = 60 - minute;
    }
  }
  else if (hour == 17) {
    if (minute < 15) {
      text = "오후 5:15";
      left = 15 - minute;
    }
    else if (minute < 30) {
      text = "오후 5:30";
      left = 30 - minute;
    }
    else {
      text = "오후 7:00";
      left = (19 - hour) * 60 - minute;
    }
  }
  else if (hour == 18) {
    text = "오후 7:00";
    left = (19 - hour) * 60 - minute;
  }
  else if (hour == 19) {
    text = "오후 09:00";
    left = (21 - hour) * 60 - minute;
  }
  else if (hour == 20) {
    text = "오후 09:00";
    left = (21 - hour) * 60 - minute;
  }
  else if (hour == 21) {
    text = "오후 10:00";
    left = (22 - hour) * 60 - minute;
  }
  else {
    text = "stop";
  }
  }
  if (text == "stop") {
    text = "오늘 하교버스 운행이 종료되었습니다.";
  }
  else if (text == "weekend") {
    text = "주말에는 하교버스 운행을 하지 않습니다.";
  }
  else {
    text = "다음 버스시간은 " + text + "입니다.\n"+"남은 시간은 "+left+"분 입니다.";
  }
  conv.add(text + "\n전체 안심역 하교 버스 시간표를 보려면 시간표라고 말씀해주세요.");
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);