using LiveChatAPp.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace LiveChatAPp.Helper
{
    public class YoutubeHelper
    {
        public static void TestProgramme()
        {
            Console.WriteLine("Test");
            Console.WriteLine(getVideoInfo("z1zxj-axCEo"));
            Console.ReadLine();
        }

        public static string GetVideoLink(string URL)
        {
            int idIndex = URL.IndexOf("=") + 1;
            string videoID = URL.Substring(idIndex);

            return videoID;

        }

        public static Video getVideoInfo(string videoID)
        {
            string APIKEY = "AIzaSyAgiUkDQp9gSqGW1NWWrK-1pgSpOezYcLw";
            string VideoAPIObj = "https://www.googleapis.com/youtube/v3/videos?id=" + videoID + 
                "&key=" + APIKEY + "&part=snippet,contentDetails";

            // download the video info in json form
            string VideoObjJson = new WebClient().DownloadString(VideoAPIObj);

            //convert info to dyanamic object for easy item access
            dynamic jsonObj = JsonConvert.DeserializeObject<dynamic>(VideoObjJson);

            string title = jsonObj["items"][0]["snippet"]["title"];
            string thumbnaiURl = jsonObj["items"][0]["snippet"]["thumbnails"]["medium"]["url"];
            string videoURL = "https://www.youtube.com/watch?v=" + videoID;

            // create a new video  object and initialize it
            Video video = new Video();
            video.VideoTitle = title;
            video.WebUrl = videoURL;
            video.ThumbnailUrl = thumbnaiURl;

            return video;
        }
    }

}
