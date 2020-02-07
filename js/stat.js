'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#FFF';
var SHADOW_SLIP = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_WIN_MESSAGE = 'Ура вы победили!';
var TEXT_LIST_RESULTS = 'Список результатов:';
var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';
var TEXT_LINE_SPACING = 20;
var SLIP_X = 50;
var SLIP_Y = 40;
var BAR_GRAPH_HEIGHT = 150;
var BAR_GRAPH_WIDTH = 40;
var BAR_GRAPH_SPACING = 50;
var CURRENT_PLAYER_NAME = 'Вы';
var CURRENT_PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

var getPlayerColor = function (playerName) {
  if (playerName === CURRENT_PLAYER_NAME) {
    return CURRENT_PLAYER_BAR_COLOR;
  }
  return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, ' + '77%)';
};

var renderCTX = function (ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(text, x, y);
};

var getMaxResult = function (results) {
  var maxResult = 0;

  for (var i = 0; i < results.length; i++) {
    if (results[i] > maxResult) {
      maxResult = results[i];
    }
  }
  return Math.floor(maxResult);
};

var renderHistogram = function (ctx, playerName, playerTime, maxTime, count) {
  var pointX = CLOUD_X + SLIP_X + (BAR_GRAPH_WIDTH + BAR_GRAPH_SPACING) * count;
  var pointY = CLOUD_Y + CLOUD_HEIGHT;
  var ratioPlayer = Math.floor(playerTime) / maxTime;

  renderText(ctx, playerName, pointX, pointY - TEXT_LINE_SPACING);
  renderText(ctx, Math.floor(playerTime), pointX, pointY - TEXT_LINE_SPACING * 2.5 - BAR_GRAPH_HEIGHT * ratioPlayer);

  ctx.fillStyle = getPlayerColor(playerName);
  ctx.fillRect(pointX, pointY - TEXT_LINE_SPACING * 2, BAR_GRAPH_WIDTH, -BAR_GRAPH_HEIGHT * ratioPlayer);
};

window.renderStatistics = function (ctx, players, times) {
  renderCTX(ctx, SHADOW_COLOR, CLOUD_X + SHADOW_SLIP, CLOUD_Y + SHADOW_SLIP);
  renderCTX(ctx, CLOUD_COLOR, CLOUD_X, CLOUD_Y);
  renderText(ctx, TEXT_WIN_MESSAGE, SLIP_X * 3, SLIP_Y);
  renderText(ctx, TEXT_LIST_RESULTS, SLIP_X * 3, SLIP_Y + TEXT_LINE_SPACING);
  for (var i = 0; i < players.length; i++) {
    renderHistogram(ctx, players[i], times[i], getMaxResult(times), i);
  }
};
