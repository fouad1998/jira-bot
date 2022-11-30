function formatTime(time) {
  return (time || 0) / 3600 + "h";
}

module.exports = { formatTime };
