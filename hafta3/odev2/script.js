$(document).ready(function () {
  let start = 0;
  const limit = 5;
  let isLoading = false;
  let allLoaded = false;
  let postCount = 0;

  function loadPosts() {
    if (isLoading || allLoaded) return;

    isLoading = true;
    $("#loading").removeClass("hidden");
    $("#error").addClass("hidden");

    $.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
    )
      .done(function (data) {
        if (data.length === 0) {
          allLoaded = true;
          $("#loading").addClass("hidden");
          $("#postContainer").append(`
                    <div class="info">
                        <div class="success-message">
                            <span class="success-icon">✅</span>
                            Tüm postlar yüklendi!
                        </div>
                    </div>
                `);
          return;
        }

        data.forEach((post, index) => {
          setTimeout(() => {
            $("#postContainer").append(`
                        <div class="post" style="animation-delay: ${
                          index * 0.1
                        }s">
                            <h3>${post.title}</h3>
                            <p>${post.body}</p>
                        </div>
                    `);
          }, index * 100);
        });

        start += limit;
        postCount += data.length;
      })
      .fail(function () {
        $("#error").removeClass("hidden");
      })
      .always(function () {
        isLoading = false;
        $("#loading").addClass("hidden");
      });
  }

  loadPosts();

  $(window).on("scroll", function () {
    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 100
    ) {
      loadPosts();
    }
  });
});
