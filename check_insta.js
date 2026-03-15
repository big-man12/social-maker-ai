
const businessId = "17841439924242983";
const accessToken = "EAAq2pOhZBZCJ0BQzkWZC39jbdZASwuMr1N1ZC9R59Rgh6ZAUxyTMRVUb91ViuMN8zSjuHf9hGRICGvZCnZCwrotp04ZAES95gd8KIvED0XosbImlW4LGHSkUFflyP1W0CPUZCfImJJZCgZB9tF7zjoyyJniMD2hMh5ClGwDS4ergD9ZCHv5dbRdqcXW0TWUKtLmHod7WLby8GfTCkFDeKKIVs38zK3Lclp4ZCphfZASNR2U";

async function checkLatestPost() {
  try {
    const url = `https://graph.facebook.com/v19.0/${businessId}/media?fields=caption,media_url,permalink,timestamp&limit=1&access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      console.log("최신 포스팅 확인 결과:");
      console.log("작성일시: " + data.data[0].timestamp);
      console.log("주소(URL): " + data.data[0].permalink);
      console.log("내용/캡션: " + data.data[0].caption);
    } else if (data.error) {
       console.log("API 오류 발생: " + data.error.message);
    } else {
      console.log("게시물을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("실행 오류: " + error.message);
  }
}

checkLatestPost();
