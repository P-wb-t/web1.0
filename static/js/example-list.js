$(document).ready(function() {
  var currentPage = 1; // 当前页数
  var totalItems = 10; // 每页显示的项目数量
  var maxPages = 10; // 总页数

  // 初始加载数据
  loadMoreData(currentPage);

  // 监听滚动事件
  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      // 当滚动到页面底部时加载更多数据
      currentPage++;
      if (currentPage <= maxPages) {
        loadMoreData(currentPage);
      }
    }
  });

  function loadMoreData(page) {
    // 模拟从服务器获取数据
    var startIndex = (page - 1) * totalItems;
    var endIndex = startIndex + totalItems;
    var items = generateMockData(startIndex, endIndex);

    // 解析返回的数据，并添加到页面中
    items.forEach(function(item) {
      var row = `
        <tr class="tr_${item.class}">
          <td valign="" class=" text-align-center">${item.rank}</td>
          <td valign="" class=" text-align-center td_no_break">${item.company}</td>
          <td valign="" class="td_break_word_5 "><a href="#" target="_blank">${item.title}</a></td>
          <td valign="" class=" text-align-center td_no_break">${item.date}</td>
        </tr>
      `;
      $('.table-container tbody').append(row);
    });
  }

  function generateMockData(start, end) {
    var mockData = [];
    for (var i = start; i < end; i++) {
      mockData.push({
        rank: i + 1,
        company: i % 2 === 0 ? '上海友升铝业股份有限公司' : '思看科技（杭州）股份有限公司',
        title: i % 2 === 0 ? '8-1 发行人及中介机构关于第一轮审核问询函的回复' : '思看科技（杭州）股份有限公司科创板首次公开发行股票招股说明书（上会稿）',
        date: '2024-07-26',
        class: i % 2 === 0 ? 'odd' : 'even'
      });
    }
    return mockData;
  }
});