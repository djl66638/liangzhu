$(document).ready(function() {
  let isDragging = false;
  let startAngle = 0;
  let currentAngle = 0;

  // 获取滑动开始的角度
  $(".circledesk").on("touchstart mousedown", function(e) {
    e.preventDefault();
    isDragging = true;
    startAngle = getAngle(e);
  });

  // 计算滑动中的角度变化
  $(".circledesk").on("touchmove mousemove", function(e) {
    e.preventDefault();
    if (isDragging) {
      let newAngle = getAngle(e);
      let angleDiff = newAngle - startAngle;
      currentAngle += angleDiff;

      // 限制角度在0到360度之间
      currentAngle = (currentAngle + 360) % 360;

      // 旋转轮盘 ,设置商品反转
      $(".circledesk").css("transform", "translate(-50%, 0%) rotate(" + currentAngle + "deg)");
	  $(".goods1").css("transform", "rotate(-" + currentAngle + "deg)");
	  $(".goods2").css("transform", "rotate(-" + currentAngle + "deg)");
	  $(".goods3").css("transform", "rotate(-" + currentAngle + "deg)");
      // 更新起始角度
      startAngle = newAngle;
    }
  });

  // 停止滑动
  $(".circledesk").on("touchend mouseup", function(e) {
    e.preventDefault();
    isDragging = false;
  });

  // 获取触摸点相对于轮盘中心的角度
  function getAngle(e) {
    let rect = $(".circledesk")[0].getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
    let deltaX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX - centerX : e.pageX - centerX;
    let deltaY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY - centerY : e.pageY - centerY;
    return (Math.atan2(deltaY, deltaX) * 180 / Math.PI + 360) % 360;
  }

  // 在这里添加根据转动结果改变页面显示的逻辑
});