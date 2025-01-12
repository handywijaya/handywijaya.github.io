import { Collections, CollectionImageType } from '../interfaces/Collections'
import '../_theme.scss'

class Constant {
  public static readonly BASE_TITLE:string = "My Travel Album"

  public static readonly COLLECTIONS:Collections = {
    "singapore-malaysia-2024": {
      id: 'singapore-malaysia-2024',
      title: 'Singapore Malaysia - 2024',
      caption: 'Exploring the wonders of Singapore and Malaysia during Christmas 2024! 🎄✨',
      popupColor: '#2b2e4a', // need to be in sync with _theme.scss
      previewImageIdx: [4, 21],
      images: [
        {
          title: 'The Waterfall @ Garden by the Bay',
          caption: 'The Waterfall @ Garden by the Bay',
          url: 'https://i.imgur.com/SrMOIDQ.jpeg',
          previewUrl: 'https://i.imgur.com/SrMOIDQm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Christmas @ Garden by the Bay',
          caption: 'Christmas @ Garden by the Bay',
          url: 'https://i.imgur.com/Vz3ZTP0.jpeg',
          previewUrl: 'https://i.imgur.com/Vz3ZTP0m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'The Top @ Garden by the Bay',
          caption: 'The Top @ Garden by the Bay',
          url: 'https://i.imgur.com/qmLSalF.jpeg',
          previewUrl: 'https://i.imgur.com/qmLSalFm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Night @ Supertree Grove 1',
          caption: 'Night @ Supertree Grove 1',
          url: 'https://i.imgur.com/H1NdinY.jpeg',
          previewUrl: 'https://i.imgur.com/H1NdinYm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Night @ Supertree Grove 2',
          caption: 'Night @ Supertree Grove 2',
          url: 'https://i.imgur.com/Yy0v4W5.jpeg',
          previewUrl: 'https://i.imgur.com/Yy0v4W5m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Night @ Supertree Grove 3',
          caption: 'Night @ Supertree Grove 3',
          url: 'https://i.imgur.com/4dOs6gQ.jpeg',
          previewUrl: 'https://i.imgur.com/4dOs6gQm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Street view building',
          caption: 'Wish can stay here someday',
          url: 'https://i.imgur.com/eucSzWr.jpeg',
          previewUrl: 'https://i.imgur.com/eucSzWrm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Dickson Nasi Lemak',
          caption: 'One is not enough',
          url: 'https://i.imgur.com/h2cggAW.jpeg',
          previewUrl: 'https://i.imgur.com/h2cggAWm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'MBS and Esplanade',
          caption: 'MBS and Esplanade',
          url: 'https://i.imgur.com/yrmfybU.jpeg',
          previewUrl: 'https://i.imgur.com/yrmfybUm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Orchid @ National Orchid Garden 1',
          caption: 'Orchid @ National Orchid Garden 1',
          url: 'https://i.imgur.com/qCI7JYs.jpeg',
          previewUrl: 'https://i.imgur.com/qCI7JYsm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Orchid @ National Orchid Garden 2',
          caption: 'Orchid @ National Orchid Garden 2',
          url: 'https://i.imgur.com/9YbHXXA.jpeg',
          previewUrl: 'https://i.imgur.com/9YbHXXAm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Orchid @ National Orchid Garden 3',
          caption: 'Orchid @ National Orchid Garden 3',
          url: 'https://i.imgur.com/XFJiQAc.jpeg',
          previewUrl: 'https://i.imgur.com/XFJiQAcm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Three Meals a Day!!!',
          caption: 'The best salted egg cuisine!!',
          url: 'https://i.imgur.com/wVxUNbC.jpeg',
          previewUrl: 'https://i.imgur.com/wVxUNbCm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Chirstmas Night @ Orchard',
          caption: 'Christmas Night @ Orchard',
          url: 'https://i.imgur.com/Gy2U5v8.jpeg',
          previewUrl: 'https://i.imgur.com/Gy2U5v8m.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'KLCC',
          caption: 'KLCC',
          url: 'https://i.imgur.com/dhyEwqz.jpeg',
          previewUrl: 'https://i.imgur.com/dhyEwqzm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Mee @ ICC Pudu',
          caption: 'Mee @ ICC Pudu',
          url: 'https://i.imgur.com/VegDdyH.jpeg',
          previewUrl: 'https://i.imgur.com/VegDdyHm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Lintang @ ICC Pudu',
          caption: 'Lintang @ ICC Pudu',
          url: 'https://i.imgur.com/DbNxRfo.jpeg',
          previewUrl: 'https://i.imgur.com/DbNxRfom.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Bunn Choon @ ICC Pudu',
          caption: 'Bunn Choon @ ICC Pudu',
          url: 'https://i.imgur.com/Pn7Tk3G.jpeg',
          previewUrl: 'https://i.imgur.com/Pn7Tk3Gm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Batu Caves 1',
          caption: 'Batu Caves',
          url: 'https://i.imgur.com/7pxrYVM.jpeg',
          previewUrl: 'https://i.imgur.com/7pxrYVMm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Char Siew Yoong',
          caption: '4 thumbs Char Siew!',
          url: 'https://i.imgur.com/V2MELP4.jpeg',
          previewUrl: 'https://i.imgur.com/V2MELP4m.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Batu Caves 2',
          caption: '300 stairs up and 300 stairs down',
          url: 'https://i.imgur.com/OhfW4Rr.jpeg',
          previewUrl: 'https://i.imgur.com/OhfW4Rrm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Kunafa Fingers',
          caption: 'The dubai chocolate addict',
          url: 'https://i.imgur.com/kF14zSl.jpeg',
          previewUrl: 'https://i.imgur.com/kF14zSlm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Melting Wagyu in Lot10',
          caption: 'The most expensive is the best one!',
          url: 'https://i.imgur.com/nfdx33h.jpeg',
          previewUrl: 'https://i.imgur.com/nfdx33hm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'The Cable Car View @ Genting Highlands',
          caption: 'The Cable Car View @ Genting Highlands',
          url: 'https://i.imgur.com/2tLfdH6.jpeg',
          previewUrl: 'https://i.imgur.com/2tLfdH6m.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Pagoda @ Genting Highlands',
          caption: 'Pagoda @ Genting Highlands',
          url: 'https://i.imgur.com/76LWQlT.jpeg',
          previewUrl: 'https://i.imgur.com/76LWQlTm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Casino @ Genting Highlands',
          caption: 'Let\'s gamble!!',
          url: 'https://i.imgur.com/imKg3Jd.jpeg',
          previewUrl: 'https://i.imgur.com/imKg3Jdm.jpeg',
          type: CollectionImageType.LANDSCAPE
        }
      ]
    },
    "refreshing-bali-2020": {
      id: 'refreshing-bali-2020',
      title: 'Refreshing Bali - 2020',
      caption: 'Enjoying the beauty of Bali and Nusa Lembongan, just before the pandemic! 🏖️',
      popupColor: '#d1e4e2', // need to be in sync with _theme.scss
      previewImageIdx: [0, 1],
      images: [
        {
          title: 'Blue Lagoon - Nusa Lembongan',
          caption: 'I could spend my entire day!',
          url: 'https://i.imgur.com/e516WMQ.jpeg',
          previewUrl: 'https://i.imgur.com/e516WMQm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Mahagiri Beach - The Full Team!',
          caption: 'You will never bored!',
          url: 'https://i.imgur.com/Q9b8oNV.jpeg',
          previewUrl: 'https://i.imgur.com/Q9b8oNVm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Blue Lagoon - Nusa Lembongan',
          caption: 'Please take me back',
          url: 'https://i.imgur.com/tAzxPo3.jpeg',
          previewUrl: 'https://i.imgur.com/tAzxPo3m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Devil\'s Tears - Nusa Lembongan',
          caption: 'Crazy scenery with deadly waves! Be careful going here!',
          url: 'https://i.imgur.com/MRj8ic5.jpeg',
          previewUrl: 'https://i.imgur.com/MRj8ic5m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Mahagiri Beach - Nusa Lembongan',
          caption: 'It is not it until you see the official sign LOL',
          url: 'https://i.imgur.com/sc3ggok.jpeg',
          previewUrl: 'https://i.imgur.com/sc3ggokm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Devil\'s Tears - Nusa Lembongan',
          caption: 'A rainbow from a closer look <3',
          url: 'https://i.imgur.com/MMnCU2g.jpeg',
          previewUrl: 'https://i.imgur.com/MMnCU2gm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Blue Lagoon - Nusa Lembongan',
          caption: 'Mother nature with its beauty',
          url: 'https://i.imgur.com/qM8ISns.jpeg',
          previewUrl: 'https://i.imgur.com/qM8ISnsm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Mahagiri Beach - The Full Team',
          caption: 'Here is our toss to enjoy the worldwide!',
          url: 'https://i.imgur.com/6ReuVaZ.jpeg',
          previewUrl: 'https://i.imgur.com/6ReuVaZm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Hidden Hills Wanagiri',
          caption: 'A beautiful scenery from almost-the-top! There are some unique photo spots here~',
          url: 'https://i.imgur.com/TEEcQFy.jpeg',
          previewUrl: 'https://i.imgur.com/TEEcQFym.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Tanah Lot',
          caption: 'Lucky to have a chance to see their ritual',
          url: 'https://i.imgur.com/3ngfny5.jpeg',
          previewUrl: 'https://i.imgur.com/3ngfny5m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'A little selfie - Mahagiri Beach',
          caption: 'Never hurts :p',
          url: 'https://i.imgur.com/j5CK90w.jpeg',
          previewUrl: 'https://i.imgur.com/j5CK90wm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Sunset Seeing - Kuta Beach',
          caption: 'Set to reset the day',
          url: 'https://i.imgur.com/CObqVYB.jpeg',
          previewUrl: 'https://i.imgur.com/CObqVYBm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'MadPops - Seminyak',
          caption: 'Another visit :p',
          url: 'https://i.imgur.com/HZhdqiF.jpeg',
          previewUrl: 'https://i.imgur.com/HZhdqiFm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'After Sunset - Seminyak Beach',
          caption: 'I am still here',
          url: 'https://i.imgur.com/F3S094L.jpeg',
          previewUrl: 'https://i.imgur.com/F3S094Lm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Sunset seeing - Kuta Beach',
          caption: 'Peaceful and calming',
          url: 'https://i.imgur.com/NY6mxfN.jpeg',
          previewUrl: 'https://i.imgur.com/NY6mxfNm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Warung Ayam Ibu Oki - Nusa Dua',
          caption: 'I believe they made this dish with love <3',
          url: 'https://i.imgur.com/IBFHfGn.jpeg',
          previewUrl: 'https://i.imgur.com/IBFHfGnm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'RivaReno - Seminyak',
          caption: 'Once a day is never enough - said someone on this photo :p',
          url: 'https://i.imgur.com/00V80Vj.jpeg',
          previewUrl: 'https://i.imgur.com/00V80Vjm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Nasi Bali Made Weti - Sanur',
          caption: 'A must visit place!!! (with 3 exclamation marks)!!!',
          url: 'https://i.imgur.com/KCzfL9u.jpeg',
          previewUrl: 'https://i.imgur.com/KCzfL9um.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Lunch - Nook',
          caption: 'Foodie with refreshing fields! Best visited at sunny afternoon',
          url: 'https://i.imgur.com/KNBcS7c.jpeg',
          previewUrl: 'https://i.imgur.com/KNBcS7cm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Breakfast - Fat Mermaid',
          caption: 'Droolingggg',
          url: 'https://i.imgur.com/WOjZOlM.jpeg',
          previewUrl: 'https://i.imgur.com/WOjZOlMm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Bebek Bengil - Ubud',
          caption: 'Tasty! The best duck I have ever eat!',
          url: 'https://i.imgur.com/xOXE53o.jpeg',
          previewUrl: 'https://i.imgur.com/xOXE53om.jpeg',
          type: CollectionImageType.PORTRAIT
        }
      ]
    },
    "luxury-bali-2019": {
      id: 'luxury-bali-2019',
      title: 'Luxury Bali - 2019',
      caption: 'Exploring the luxuriousness of Bali. Paradise awaits! 🌾🌿',
      popupColor: '#f5f5dc', // need to be in sync with _theme.scss
      previewImageIdx: [1, 2],
      images: [
        {
          title: 'The Apurva Kempinski Bali',
          caption: 'Overnight is not enough!',
          url: 'https://i.imgur.com/ip0ujBO.jpeg',
          previewUrl: 'https://i.imgur.com/ip0ujBOm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },{
          title: 'The Apurva Kempinski Bali - Rooftop View',
          caption: 'Breathtaking view!',
          url: 'https://i.imgur.com/kAHSgtm.jpeg',
          previewUrl: 'https://i.imgur.com/kAHSgtmm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },{
          title: 'The Apurva Kempinski Bali - Garden View',
          caption: 'Fresh garden view!',
          url: 'https://i.imgur.com/QzUGgDE.jpeg',
          previewUrl: 'https://i.imgur.com/QzUGgDEm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },{
          title: 'Ini Vie Villa - Floating Breakfast',
          caption: 'Splashhh!! Yum!!',
          url: 'https://i.imgur.com/9L1wjgK.jpeg',
          previewUrl: 'https://i.imgur.com/9L1wjgKm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },{
          title: 'Tegallalang Rice Terrace',
          caption: 'It\'s all green!',
          url: 'https://i.imgur.com/Sv69kqu.jpeg',
          previewUrl: 'https://i.imgur.com/Sv69kqum.jpeg',
          type: CollectionImageType.LANDSCAPE
        },{
          title: 'Tegallalang Rice Terrace',
          caption: 'Green green green',
          url: 'https://i.imgur.com/BFeRHqe.jpeg',
          previewUrl: 'https://i.imgur.com/BFeRHqem.jpeg',
          type: CollectionImageType.LANDSCAPE
        },{
          title: 'The Apurva Kempinski Bali - Ocean View',
          caption: 'Crazy ocean view. Best using eye!!',
          url: 'https://i.imgur.com/XZomE0T.jpeg',
          previewUrl: 'https://i.imgur.com/XZomE0Tm.jpeg',
          type: CollectionImageType.PORTRAIT
        },{
          title: 'Lunch@Living Stone',
          caption: 'Great foods!!',
          url: 'https://i.imgur.com/mrjxs1u.jpeg',
          previewUrl: 'https://i.imgur.com/mrjxs1um.jpeg',
          type: CollectionImageType.PORTRAIT
        },{
          title: 'Mad Pops',
          caption: 'Best ice cream! Praline Swirl to swirl happiness to your cup~',
          url: 'https://i.imgur.com/e3wnZSe.jpeg',
          previewUrl: 'https://i.imgur.com/e3wnZSem.jpeg',
          type: CollectionImageType.PORTRAIT
        }
      ]
    },
    "spring-japan-2018": {
      id: 'spring-japan-2018',
      title: 'Spring Japan - 2018',
      caption: 'Springtime adventures in Osaka, Kyoto, and Tokyo with my brother 🌸',
      popupColor: '#ffd7e8', // need to be in sync with _theme.scss
      previewImageIdx: [4, 31],
      images: [
        {
          title: 'Nishiemba Park, Osaka',
          caption: 'Sakura and bright sky. Perfect!',
          url: 'https://i.imgur.com/2huDvEo.jpeg',
          previewUrl: 'https://i.imgur.com/2huDvEom.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Osaka Castle, Osaka',
          caption: 'Unfortunately, we can\'t get in',
          url: 'https://i.imgur.com/gYys86W.jpeg',
          previewUrl: 'https://i.imgur.com/gYys86Wm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Nishiemba Park, Osaka',
          caption: 'Gimme moreeee',
          url: 'https://i.imgur.com/DjrB5MW.jpeg',
          previewUrl: 'https://i.imgur.com/DjrB5MWm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Kema Sakuronamiya Park, Osaka',
          caption: 'Lucky still got a chance to view sakura here!',
          url: 'https://i.imgur.com/PTxqrJs.jpeg',
          previewUrl: 'https://i.imgur.com/PTxqrJsm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Kema Sakuronamiya Park, Osaka',
          caption: 'Pinky pinky',
          url: 'https://i.imgur.com/RMKWmM6.jpeg',
          previewUrl: 'https://i.imgur.com/RMKWmM6m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Kema Sakuronamiya Park, Osaka',
          caption: 'Wondering~',
          url: 'https://i.imgur.com/Y6DNkyW.jpeg',
          previewUrl: 'https://i.imgur.com/Y6DNkyWm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Gudetama Cafe at Hep Five, Osaka',
          caption: 'Too cute to be eaten :"',
          type: CollectionImageType.LANDSCAPE,
          url: 'https://i.imgur.com/aPTimWD.jpeg',
          previewUrl: 'https://i.imgur.com/aPTimWDm.jpeg',
        },
        {
          title: 'Glico Sign at Dotonbori, Osaka',
          caption: 'Woohoooo!',
          url: 'https://i.imgur.com/uzaOwIc.jpeg',
          previewUrl: 'https://i.imgur.com/uzaOwIcm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'The Night at Shinsekai, Osaka',
          caption: 'The luminous market',
          type: CollectionImageType.LANDSCAPE,
          url: 'https://i.imgur.com/srOLuWd.jpeg',
          previewUrl: 'https://i.imgur.com/srOLuWdm.jpeg',
        },
        {
          title: 'Kushikatsu Daruma at Shinsekai, Osaka',
          caption: 'The sauce is a bit different from Indonesia but still delicioso',
          type: CollectionImageType.PORTRAIT,
          url: 'https://i.imgur.com/hjUthBf.jpeg',
          previewUrl: 'https://i.imgur.com/hjUthBfm.jpeg',
        },
        {
          title: 'Kinryu Ramen at Dotonbori, Osaka',
          caption: 'First ramen at Japan!',
          url: 'https://i.imgur.com/1y66kAo.jpeg',
          previewUrl: 'https://i.imgur.com/1y66kAom.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Tsutenkaku, Osaka',
          caption: 'The iconic tower',
          type: CollectionImageType.PORTRAIT,
          url: 'https://i.imgur.com/R67gtd5.jpeg',
          previewUrl: 'https://i.imgur.com/R67gtd5m.jpeg',
        },
        {
          title: 'Kinkaku-ji Entrance, Kyoto',
          caption: 'Posing with my new umbrella!',
          url: 'https://i.imgur.com/YeRTWXr.jpeg',
          previewUrl: 'https://i.imgur.com/YeRTWXrm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Kinkaku-ji, Kyoto',
          caption: 'Golden shine!!',
          url: 'https://i.imgur.com/A2toYLO.jpeg',
          previewUrl: 'https://i.imgur.com/A2toYLOm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'White Sakura at Arashiyama, Kyoto',
          caption: 'My first love <3',
          url: 'https://i.imgur.com/MMDbsM9.jpeg',
          previewUrl: 'https://i.imgur.com/MMDbsM9m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'A Random Dessert, Kyoto Station',
          caption: 'Beautifully crafted?',
          url: 'https://i.imgur.com/lp08Tql.jpeg',
          previewUrl: 'https://i.imgur.com/lp08Tqlm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'A Random Ramen, Kyoto Station',
          caption: 'All you can egg!',
          url: 'https://i.imgur.com/laZEUHu.jpeg',
          previewUrl: 'https://i.imgur.com/laZEUHum.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Senbon Torii Path at Fushimi Inari Taisha, Kyoto',
          caption: 'Do I look good? It\'s blur I guess',
          url: 'https://i.imgur.com/9rElwOS.jpeg',
          previewUrl: 'https://i.imgur.com/9rElwOSm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'The Life-Sized Unicorn Gundam, Odaiba',
          caption: 'It moves after certain time. No kidding',
          url: 'https://i.imgur.com/nkSw6Xw.jpeg',
          previewUrl: 'https://i.imgur.com/nkSw6Xwm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'The Rainbow Bridge, Odaiba',
          caption: 'I could be here all day just to view this horizon',
          url: 'https://i.imgur.com/WsmGL3p.jpeg',
          previewUrl: 'https://i.imgur.com/WsmGL3pm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Odaiba Statue of Liberty Replica, Odaiba',
          caption: 'The crowded spot',
          url: 'https://i.imgur.com/E6nUsof.jpeg',
          previewUrl: 'https://i.imgur.com/E6nUsofm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'A random shot at Akihabara, Tokyo',
          caption: 'The most lively place, we can hear music everywhere',
          url: 'https://i.imgur.com/3S9BamX.jpeg',
          previewUrl: 'https://i.imgur.com/3S9BamXm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'AKB48 Cafe, Tokyo',
          caption: 'I didn\'t get in hehe',
          url: 'https://i.imgur.com/e8xuFnl.jpeg',
          previewUrl: 'https://i.imgur.com/e8xuFnlm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Ginza Street, Tokyo',
          caption: 'Walking with sakura',
          url: 'https://i.imgur.com/cR1ycEw.jpeg',
          previewUrl: 'https://i.imgur.com/cR1ycEwm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'The Shibuya Shot, Tokyo',
          caption: 'So much people!',
          url: 'https://i.imgur.com/nmuuZtO.jpeg',
          previewUrl: 'https://i.imgur.com/nmuuZtOm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Shibuya Crossing Street, Tokyo',
          caption: 'Quiet, no music, eyes on traffic lamp',
          url: 'https://i.imgur.com/2RBwjOT.jpeg',
          previewUrl: 'https://i.imgur.com/2RBwjOTm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Shibuya Crossing Street, Tokyo',
          caption: 'Music starts!! Let the crossing begin!!',
          url: 'https://i.imgur.com/eGiKDw6.jpeg',
          previewUrl: 'https://i.imgur.com/eGiKDw6m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Hachiko Statue at Shibuya, Tokyo',
          caption: 'Woof!',
          url: 'https://i.imgur.com/HJCZjHf.jpeg',
          previewUrl: 'https://i.imgur.com/HJCZjHfm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Ropongi Hills, Tokyo',
          caption: 'Enjoying view of Tokyo Tower with 2 famous drinks in Japan',
          url: 'https://i.imgur.com/JuGydrV.jpeg',
          previewUrl: 'https://i.imgur.com/JuGydrVm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Tokyo Tower, Tokyo',
          caption: 'A closer look of Tokyo Tower',
          type: CollectionImageType.PORTRAIT,
          url: 'https://i.imgur.com/RUoYkMF.jpeg',
          previewUrl: 'https://i.imgur.com/RUoYkMFm.jpeg',
        },
        {
          title: 'Gyukatsu Motomura, Tokyo',
          caption: 'Best gyukatsu. Ever. Must try!! Definitely return!!!',
          url: 'https://i.imgur.com/mZtKGdM.jpeg',
          previewUrl: 'https://i.imgur.com/mZtKGdMm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Ropongi Hills, Tokyo',
          caption: 'Bro shot with blurred Tokyo Tower!',
          url: 'https://i.imgur.com/aiRZWka.jpeg',
          previewUrl: 'https://i.imgur.com/aiRZWkam.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Tokyo Tower Mascott, Tokyo',
          caption: 'That bandage tho LOL',
          url: 'https://i.imgur.com/nvRIQgQ.jpeg',
          previewUrl: 'https://i.imgur.com/nvRIQgQm.jpeg',
          type: CollectionImageType.LANDSCAPE
        }        
      ]
    },
    "ora-beach-2018": {
      id: 'ora-beach-2018',
      title: 'Ora Beach - 2018',
      caption: 'Serene vibes and turquoise dreams in Eastern of Indonesia 🌊✨',
      popupColor: '#a0d8ef', // need to be in sync with _theme.scss
      previewImageIdx: [14, 15],
      images: [
        {
          title: 'Saleman Port',
          caption: 'Port to depart to Ora Beach',
          url: 'https://i.imgur.com/PoamBSL.jpg',
          previewUrl: 'https://i.imgur.com/PoamBSLm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Evening near Saleman Port',
          caption: 'Evening on a field near Saleman Port',
          url: 'https://i.imgur.com/U9gMxnq.jpg',
          previewUrl: 'https://i.imgur.com/U9gMxnqm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Arrived at Ora Beach',
          caption: 'Arrived at Ora Beach',
          url: 'https://i.imgur.com/6R2Oc3d.jpg',
          previewUrl: 'https://i.imgur.com/6R2Oc3dm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Arrived at Ora Beach!!',
          caption: 'Arrived at Ora Beach!!',
          url: 'https://i.imgur.com/aRlpKmU.jpg',
          previewUrl: 'https://i.imgur.com/aRlpKmUm.jpg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Group Photo',
          caption: 'Arrival Group photo',
          url: 'https://i.imgur.com/kLnofKU.jpg',
          previewUrl: 'https://i.imgur.com/kLnofKUm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Turqoise Dreams',
          caption: 'Turqoise dreams',
          url: 'https://i.imgur.com/qZGomdi.jpg',
          previewUrl: 'https://i.imgur.com/qZGomdim.jpg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Scene 1',
          caption: 'Scene 1',
          url: 'https://i.imgur.com/ZVVDhn7.jpg',
          previewUrl: 'https://i.imgur.com/ZVVDhn7m.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Scene 2',
          caption: 'Scene 2',
          url: 'https://i.imgur.com/hPlDDO6.jpg',
          previewUrl: 'https://i.imgur.com/hPlDDO6m.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Scene 3',
          caption: 'Scene 3',
          url: 'https://i.imgur.com/uONVEjI.jpg',
          previewUrl: 'https://i.imgur.com/uONVEjIm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Sunset Chaser 1',
          caption: 'Sunset chaser 1',
          url: 'https://i.imgur.com/z4VnidS.jpg',
          previewUrl: 'https://i.imgur.com/z4VnidSm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Sunset Chaser 2',
          caption: 'Sunset chaser 2',
          url: 'https://i.imgur.com/l2gzjQq.jpg',
          previewUrl: 'https://i.imgur.com/l2gzjQqm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Sunset Chaser 3',
          caption: 'Sunset chaser 3',
          url: 'https://i.imgur.com/w8QJdTD.jpg',
          previewUrl: 'https://i.imgur.com/w8QJdTDm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Hotel View',
          caption: 'Hotel view',
          url: 'https://i.imgur.com/Hjr0nOd.jpg',
          previewUrl: 'https://i.imgur.com/Hjr0nOdm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Is this even sea?',
          caption: 'Is this even sea?',
          url: 'https://i.imgur.com/Bc2AmVU.jpg',
          previewUrl: 'https://i.imgur.com/Bc2AmVUm.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Ora Cave on High Tide',
          caption: 'Ora Cave on high tide',
          url: 'https://i.imgur.com/Gc6fape.jpg',
          previewUrl: 'https://i.imgur.com/Gc6fapem.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Group Photo at Ora Cave',
          caption: 'Group photo at Ora Cave',
          url: 'https://i.imgur.com/18zSh4i.jpg',
          previewUrl: 'https://i.imgur.com/18zSh4im.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Departure Group Photo',
          caption: 'Departure group photo',
          url: 'https://i.imgur.com/BZKiB1x.jpg',
          previewUrl: 'https://i.imgur.com/BZKiB1xm.jpg',
          type: CollectionImageType.LANDSCAPE
        }
      ]
    },
    "explore-singapore-2018": {
      id: 'explore-singapore-2018',
      title: 'Explore Singapore - 2018',
      caption: 'First time abroad with my close friends, exploring the wonders of Singapore! 🎢',
      popupColor: '#f0f0f0', // need to be in sync with _theme.scss
      previewImageIdx: [0, 2],
      images: [
        {
          title: 'Helix Bridge',
          caption: 'Hot summer~',
          url: 'https://i.imgur.com/IHOcEPJ.jpeg',
          previewUrl: 'https://i.imgur.com/IHOcEPJm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Random Plant at Flower Dome',
          caption: 'Honestly I don\'t remember the name LOL',
          url: 'https://i.imgur.com/ZwAAXeN.jpeg',
          previewUrl: 'https://i.imgur.com/ZwAAXeNm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'The Marina Bay Sands Area',
          caption: 'When...',
          url: 'https://i.imgur.com/RM8pera.jpeg',
          previewUrl: 'https://i.imgur.com/RM8peram.jpg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Waterfall at Cloud Forest',
          caption: 'Beautiful and mezmerizing!',
          url: 'https://i.imgur.com/1QwXmRk.jpeg',
          previewUrl: 'https://i.imgur.com/1QwXmRkm.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Another Random Plant at Flower Dome',
          caption: 'The-forgotten-name by me. But it\'s cute!',
          url: 'https://i.imgur.com/WuiMfNW.jpeg',
          previewUrl: 'https://i.imgur.com/WuiMfNWm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Gardens by the Bay',
          caption: 'Our rest area after circling Flower Dome and Cloud Forest LOL',
          url: 'https://i.imgur.com/SewSTqu.jpeg',
          previewUrl: 'https://i.imgur.com/SewSTqum.jpeg',
          type: CollectionImageType.PORTRAIT
        },
        {
          title: 'Lego Creation at Cloud Forest',
          caption: 'Lego in camouflage!',
          url: 'https://i.imgur.com/a2rzLa0.jpeg',
          previewUrl: 'https://i.imgur.com/a2rzLa0m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Unversal Studios Singapore Entrance',
          caption: 'Yuhuuuu~~~',
          url: 'https://i.imgur.com/PSqPnAw.jpeg',
          previewUrl: 'https://i.imgur.com/PSqPnAwm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Stone Plant at Flower Dome',
          caption: 'I remember the name this time!! LOL',
          url: 'https://i.imgur.com/q5ranB1.jpeg',
          previewUrl: 'https://i.imgur.com/q5ranB1m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Jurassic Park, Universal Studios Singapore',
          caption: 'Raawwwrrr!',
          url: 'https://i.imgur.com/B43DH29.jpeg',
          previewUrl: 'https://i.imgur.com/B43DH29m.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Battlestar Galactica, Universal Studios Singapore',
          caption: 'No more!! I still love my heart!!!',
          url: 'https://i.imgur.com/XNf96ry.jpeg',
          previewUrl: 'https://i.imgur.com/XNf96rym.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'The Mummy, Universal Studios Singapore',
          caption: 'Thrilling yet addictive! I\'m ready for another ride!! Hahahahahahahahah',
          url: 'https://i.imgur.com/JF0043W.jpeg',
          previewUrl: 'https://i.imgur.com/JF0043Wm.jpeg',
          type: CollectionImageType.LANDSCAPE
        },
        {
          title: 'Spaghetti Space Chase, Universal Studios Singapore',
          caption: 'The perfect ride to cool down the day! Let\'s save the planet againnnn :3',
          url: 'https://i.imgur.com/UpE1D0H.jpeg',
          previewUrl: 'https://i.imgur.com/UpE1D0Hm.jpeg',
          type: CollectionImageType.LANDSCAPE
        }
      ]
    }
  }
}

export default Constant