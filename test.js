var calibrationEstimate = calibrationF(),focusTabState,notificationState,notificationVisibility=document.createAttribute("class"),focusTabVisibility=document.createAttribute("class");notificationVisibility.value="hidden";focusTabVisibility.value="hidden";windowSettings();function proceed(){var varAttack=attackTimeInput(),attackMs=Number(document.getElementById("millisecond_input").value),lMs=attackMs.length,notificationTime=Number(document.getElementById("notification_input").value)*60000,msDisplay=checkMs(attackMs,lMs),varNow=timeNow(),timeDif=varAttack-varNow;Dialog.close();if(timeDif<0){timeDif=24*3600000-varNow+varAttack;}var duration=$(".relative_time").attr("data-duration"),currentTime=new Date().getTime(),attackTime=currentTime+timeDif-duration*1000,sendTimeDisplay=timeDisplay(attackTime);var rowNumber=document.getElementById("date_arrival").parentNode.rowIndex+5,inTr=document.createElement("TR"),inNameTd=document.createElement("TD");inTr.appendChild(inNameTd);var inNameText=document.createTextNode("Send in:");inNameTd.appendChild(inNameText);var inContentTd=document.createElement("TD"),inTdId=document.createAttribute("id");inTdId.value="in_content";inContentTd.setAttributeNode(inTdId);var inContentText=document.createTextNode("synchronizing clocks...");inContentTd.appendChild(inContentText);inTr.appendChild(inContentTd);var inBody=document.getElementById("date_arrival").parentNode.parentNode;inBody.insertBefore(inTr,inBody.childNodes[rowNumber]);var sendTr=document.createElement("TR");var sendNameTd=document.createElement("TD");sendTr.appendChild(sendNameTd);var sendNameText=document.createTextNode("Send:");sendNameTd.appendChild(sendNameText);var sendContentTd=document.createElement("TD"),sendTdId=document.createAttribute("id");sendTdId.value="send_content";sendContentTd.setAttributeNode(sendTdId);var sendContentText=document.createTextNode("");sendContentTd.innerHTML=sendTimeDisplay;sendContentTd.appendChild(sendContentText);sendTr.appendChild(sendContentTd);var sendBody=document.getElementById("date_arrival").parentNode.parentNode;sendBody.insertBefore(sendTr,sendBody.childNodes[rowNumber]);document.getElementById("send_ms").innerHTML=msDisplay;if(attackTime<currentTime){alert("Too late or too far away to arrive at the given time :'(");} else{var check=0,tickIntervale=Timing.tick_interval,serverTime=document.getElementById("serverTime").innerHTML,tickSynchronizer=setInterval(synchronizer,1),timerInterval;function synchronizer(){var serverTimeCheck=document.getElementById("serverTime").innerHTML;if(serverTime!=serverTimeCheck){setTimeout(function(){timerInterval=setInterval(myTimer,tickIntervale);clearInterval(tickSynchronizer);},attackMs+1);}}function myTimer(){currentTime=Timing.getCurrentServerTime();var inTime=Math.round(attackTime-currentTime),inTimeToDisplay=timeToSend(inTime),inTimeDisplay=document.getElementById("in_content");inTimeDisplay.innerHTML=inTimeToDisplay;if(notificationState==1&&(attackTime-currentTime)<=notificationTime&&check==0){if(focusTabState==1){if(notificationTime==60000){confirm(notificationTime/60000+" Minute left to command excecution!");}else{confirm(notificationTime/60000+" Minutes left to command excecution!");}}else{var notificationWindow=window.open("","Alert","width=200,height=20");notificationWindow.document.head.innerHTML=("<link rel='stylesheet' type='text/css' href='https://dsno.innogamescdn.com/assets/no24/427980c4bd832083e2f85d5f5b9952c5/merged/game.css'>");if(notificationTime==60000){notificationWindow.document.body.innerHTML=("<h4 class='tooltip-style' id='note'>"+notificationTime/60000+" Minute left to command excecution!</h4>");}else{notificationWindow.document.body.innerHTML=("<h4 class='tooltip-style' id='note'>"+notificationTime/60000+" Minutes left to command excecution!</h4>");}}check = 1;}if((attackTime-currentTime)<=0){inTimeDisplay = document.getElementById("in_content");inTimeDisplay.innerHTML = "00:00:00:<span class='grey small'>000</span>";clearInterval(timerInterval);document.title = "00:00:00";}}}function attackTimeInput(){var attackH = Number(document.getElementById("hour_input").value),attackM = Number(document.getElementById("minute_input").value),attackS = Number(document.getElementById("second_input").value),attackMs = Number(document.getElementById("millisecond_input").value);var h = checkH(attackH), m = checkM(attackM), s = checkM(attackS), ms = checkMs(attackMs);document.getElementById("date_arrival").parentNode.parentNode.parentNode.style.width=("350px");var newInput = ("<span id='new_input_time'>| "+h+":"+m+":"+s+":"+"<span class='grey small' id='new_input_milliseconds'>"+ms+"</span></span>"),newElement = document.createElement('span');newElement.innerHTML = newInput;document.getElementById('date_arrival').appendChild(newElement.firstChild);return 3600000*attackH+60000*attackM+1000*attackS+attackMs;} function timeNow(){var now = new Date(),h = now.getUTCHours()+window.server_utc_diff/3600,m = now.getUTCMinutes(),s = now.getUTCSeconds(),ms = now.getUTCMilliseconds();return 3600000*h + 60000*m + 1000*s+ms+calibrationEstimate;} function timeDisplay(i){ var timeToDisplay = new Date(i), h = timeToDisplay.getHours(), m = timeToDisplay.getMinutes(), s = timeToDisplay.getSeconds(), ms = timeToDisplay.getMilliseconds(); h = checkH(h); m = checkM(m); s = checkM(s); ms = checkMs(ms); return h+":"+m+":"+s+":"+"<span class='grey small' id='send_ms'>"+ms+"</span>"; }function timeToSend(i){var h = Math.floor(i/(3600000)),m = Math.floor((i-h*3600000)/(60000)),s = Math.floor((i-h*3600000-m*60000)/(1000)),ms = i-h*3600000-m*60000-s*1000;h = checkH(h);m = checkM(m);s = checkM(s);ms = checkMs(ms);document.title = h+":"+m+":"+s;return h+":"+m+":"+s/*+":"+"<span class='grey small'>"+ms+"</span>"*/;}}function calibrationF(){var timeDif = Number(Timing.getCurrentServerTime())-Number(new Date().getTime());return timeDif;}function arriveDisplay(){var attackH = document.getElementsByName('hour')[0].value,attackM = document.getElementsByName('minute')[0].value,attackS = document.getElementsByName('second')[0].value,attackMs = Math.round(document.getElementsByName('millisecond')[0].value),lH = attackH.length,lM = attackM.length,lS = attackS.length,lMs = attackMs.length;attackH = checkH(attackH,lH);attackM = checkM(attackM,lM);attackS = checkM(attackS,lS);attackMs = checkMs(attackMs,lMs);}function checkH(i,l){ if (l == 0 || l>2 || i>23) {i = "00";} else if (l == 1 || i<10) {i = "0" + i;} return i;}function checkM(i,l){ if (l == 0 || l>2) {i = "00";} else if (l == 1 || i <10) {i = "0" + i;} else if (i > 59) {i = "59";} return i;}function checkMs(i,l){ if (l == 0 || l>3) {i = "000";} else if (l == 1 || i<10) {i = "00" + i;} else if (l == 2 || (i>=10 && i<100)) {i = "0" + i;} else if (i > 999) {i = "999";} return i;}function notificationTest(){var notificationWindow = window.open("", "Alert", "width=200, height=20"); notificationWindow.document.head.innerHTML=("<link rel='stylesheet' type='text/css' href='https://dsno.innogamescdn.com/assets/no24/427980c4bd832083e2f85d5f5b9952c5/merged/game.css'>");notificationWindow.document.body.innerHTML=("<h4 class='tooltip-style' id='note'>Seems to be working!</h4>");}function windowSettings(){var newInput = ("<div class='popup_box_container'><div class='popup_box show' id='popup_box_help' style='width: 350px;'><div class='popup_box_content'><a class='popup_box_close tooltip-delayed' href='#' onclick='Dialog.close()'>&nbsp;</a><h2 class='popup_box_header'>Command Assistant</h2><td valign='top'><table class='vis' style='width:150px' background='https://dsno.innogamescdn.com/8.44.1/28623/graphic/index/main_bg.jpg'><tbody><tr><th>Time for arrival</th></tr><tr><td class='nowrap'><span>Hour:</span> <input value='' tabindex='1' style='width: 50px;float:right;margin-right:3px' type='number' name='hour' id='hour_input' max='23' min='0'> </td></tr><tr><td class='nowrap'><span>Minute:</span> <input id='minute_input' name='minute' type='number' style='width: 50px;float:right;margin-right:3px' tabindex='2' value='' max='59' min='0'> </td></tr><tr><td class='nowrap'><span>Second:</span> <input id='second_input' name='second' type='number' style='width: 50px;float:right;margin-right:3px' tabindex='3' value='' max='59' min='0'>\n</td></tr><tr><td class='nowrap'><span>Millisecond:</span> <input id='millisecond_input' name='millisecond' type='number' style='width: 50px;margin-right:3px;float:right' tabindex='4' value='' max='999' min='0'></td></tr></tbody></table><table class='vis' style='width:300px' background='https://dsno.innogamescdn.com/8.44.1/28623/graphic/index/main_bg.jpg'><tbody><tr><th>Command options</th></tr><tr><td class='nowrap'><input type='checkbox' id='notification_checkbox' tabindex='6'><span>Enable notifications</span></td></tr><tr><td class='nowrap'><span id='notification_text'>Minutes to notify before command:</span><input id='notification_input' name='notificationInput' type='number' style='width: 35px;float:right;margin-right:3px' tabindex='5' value='1' max='60' min='0'></td></tr><tr><td class='nowrap'><input type='checkbox' id='focus_tab_checkbox' tabindex='7'><span id='autofocus_text'>Automaticly focus tab on notification</span></td></tr></tbody></table><br><button id=confirmBtn class='btn'>Confirm</button><br><br><p class='tooltip-style' id='note' style='position:relative;visibility:hidden;'><strong>Note:</strong> Some browsers may require permission for popups. If notifications is enabled, make sure your browser have the right permission to display these. Test notifications here: <strong><test id='popup_test' style='color:black;' onmouseover='mOver()' onmouseout='mOut()'>here</test></strong></p></div></div><div class='fader'></div></div>");var newElement = document.createElement('div');newElement.innerHTML = newInput;document.getElementById('ds_body').appendChild(newElement.firstChild);//event Listeners:document.getElementById("note").style.display = "hidden";document.getElementById("confirmBtn").addEventListener("click", arriveDisplay);document.getElementById("confirmBtn").addEventListener("click", proceed);document.getElementById("notification_text").setAttributeNode(notificationVisibility);document.getElementById("autofocus_text").setAttributeNode(focusTabVisibility);document.querySelector('#notification_checkbox').addEventListener('change', notificationCheckbox);document.querySelector('#focus_tab_checkbox').addEventListener('change', focusTabCheckbox);document.getElementById("popup_test").addEventListener("click",notificationTest);}function notificationCheckbox(){if(notification_checkbox.checked){notificationState = 1; notificationVisibility.value = "visible";focusTabVisibility.value = "visible";document.getElementById("note").style.visibility = "visible";document.getElementById("autofocus_text").setAttributeNode(notificationVisibility);document.getElementById("notification_text").setAttributeNode(notificationVisibility);}else{notificationState = 0;notificationVisibility.value = "hidden";focusTabVisibility.value = "hidden"; document.getElementById("note").style.visibility = "hidden";document.getElementById("autofocus_text").setAttributeNode(notificationVisibility);document.getElementById("notification_text").setAttributeNode(notificationVisibility);}}function focusTabCheckbox(){if(focus_tab_checkbox.checked){focusTabState = 1;}else{ focusTabState = 0; }}function mOver(){document.getElementById("popup_test").style.color="red";}function mOut(){document.getElementById("popup_test").style.color="black";}
