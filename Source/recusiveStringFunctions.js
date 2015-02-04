  var alreadyShownOneAlert = false;
var debugLogRecursive = false;
  

//               A                   B  C        D                       E  F
//     find in stored", (initial start, end, from this), min match length -> expected start of match
//                        A          B  C        D                       E  F
validateRecursiveBeg("abcdefghijkl", 0, 0+3, "abcdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 1, 1+3, "abcdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 2, 2+3, "abcdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 3, 3+3, "abcdefghij"              , 4, 0);
//           
validateRecursiveBeg("abcdefghijkl", 0, 0+3,  "bcdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 1, 1+3,  "bcdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 2, 2+3,  "bcdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 3, 3+3,  "bcdefghij"              , 4, 0);
//           
validateRecursiveBeg("abcdefghijkl", 0, 0+3,   "cdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 1, 1+3,   "cdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 2, 2+3,   "cdefghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 3, 3+3,   "cdefghij"              , 4, 0);
//           
validateRecursiveBeg("abcdefghijkl", 0, 0+3,    "defghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 1, 1+3,    "defghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 2, 2+3,    "defghij"              , 4, 0);
validateRecursiveBeg("abcdefghijkl", 3, 3+3,    "defghij"              , 4, 0);
//       
//       
validateRecursiveBeg("abcdefghijkl", 0, 0+3,       "ghijklm"           , 4, 0);
validateRecursiveBeg("abcdefghijkl", 1, 1+3,       "ghijklm"           , 4, 0);
validateRecursiveBeg("abcdefghijkl", 2, 2+3,       "ghijklm"           , 4, 0);
//       
//       
//       
validateRecursiveBeg("abcdefghijkl", 1, 1+3,    "_abcdefghijk"         , 4, 1);
validateRecursiveBeg("abcdefghijkl", 2, 2+3,    "_abcdefghijk"         , 4, 1);
validateRecursiveBeg("abcdefghijkl", 3, 3+3,    "_abcdefghijk"         , 4, 1);
validateRecursiveBeg("abcdefghijkl", 4, 4+3,    "_abcdefghijk"         , 4, 1);
//       
validateRecursiveBeg("abcdefghijkl", 2, 2+3,    "__bcdefghijk"         , 4, 2);
validateRecursiveBeg("abcdefghijkl", 3, 3+3,    "__bcdefghijk"         , 4, 2);
validateRecursiveBeg("abcdefghijkl", 4, 4+3,    "__bcdefghijk"         , 4, 2);
validateRecursiveBeg("abcdefghijkl", 5, 5+3,    "__bcdefghijk"         , 4, 2);
//   
validateRecursiveBeg("abcdefghijkl", 3, 3+3,    "___cdefghijk"         , 4, 3);
validateRecursiveBeg("abcdefghijkl", 4, 4+3,    "___cdefghijk"         , 4, 3);
validateRecursiveBeg("abcdefghijkl", 5, 5+3,    "___cdefghijk"         , 4, 3);
validateRecursiveBeg("abcdefghijkl", 6, 6+3,    "___cdefghijk"         , 4, 3);
//       
validateRecursiveBeg("abcdefghijkl", 4, 4+3,    "____defghijk"         , 4, 4);
validateRecursiveBeg("abcdefghijkl", 5, 5+3,    "____defghijk"         , 4, 4);
validateRecursiveBeg("abcdefghijkl", 6, 6+3,    "____defghijk"         , 4, 4);
validateRecursiveBeg("abcdefghijkl", 7, 7+3,    "____defghijk"         , 4, 4);

   
//               A                   B  C        D                       E  F
//     find in stored", (initial start, end, from this), min match length -> expected end of match
//                        A          B  C        D                       E  F
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcd"                    , 1, 3);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcde"                   , 2, 4);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdef"                  , 4, 5);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefg"                 , 4, 6);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefgh"                , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghi"               , 8, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghij"              , 8, 9);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghijk"             , 8, 10);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghijkl"            , 16, 11);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghijkl_"           , 16, 11);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghijkl__"          , 16, 11);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghijkl___"         , 16, 11);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghijkl____"        , 16, 11);
validateRecursiveEnd("abcdefghijkl", 0, 0+3, "abcdefghijkl_____"       , 16, 11);
//
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcde"                   , 1, 3);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdef"                  , 2, 4);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefg"                 , 4, 5);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefgh"                , 4, 6);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghi"               , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghij"              , 8, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghijk"             , 8, 9);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghijkl"            , 8, 10);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghijkl_"           , 16, 10);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghijkl__"          , 16, 10);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghijkl___"         , 16, 10);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghijkl____"        , 16, 10);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,  "bcdefghijkl_____"       , 16, 10);
//
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdef"                  , 1, 3);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefg"                 , 2, 4);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefgh"                , 4, 5);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghi"               , 4, 6);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghij"              , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghijk"             , 8, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghijkl"            , 8, 9);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghijkl_"           , 8, 9);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghijkl__"          , 16, 9);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghijkl___"         , 16, 9);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghijkl____"        , 16, 9);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,   "cdefghijkl_____"       , 16, 9);
//
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defg"                 , 1, 3);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defgh"                , 2, 4);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghi"               , 4, 5);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghij"              , 4, 6);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghijk"             , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghijkl"            , 8, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghijkl_"           , 8, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghijkl__"          , 8, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghijkl___"         , 16, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghijkl____"        , 16, 8);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,    "defghijkl_____"       , 16, 8);
//1
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efgh"                , 1, 3);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghi"               , 2, 4);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghij"              , 4, 5);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghijk"             , 4, 6);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghijkl"            , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghijkl_"           , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghijkl__"          , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghijkl___"         , 8, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghijkl____"        , 16, 7);
validateRecursiveEnd("abcdefghijkl", 0, 0+3,     "efghijkl_____"       , 16, 7);






validateRecursiveLargest("abcdefghijkl", 0,      "abcd"                , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "abcde"               , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdef"              , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefg"             , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefgh"            , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghi"           , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghij"          , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijk"         , 4, 0, 10);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijkl"        , 4, 0, 11);
//    
validateRecursiveLargest("abcdefghijkl", 0,      "abcd_"               , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "abcde_"              , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdef_"             , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefg_"            , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefgh_"           , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghi_"          , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghij_"         , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijk_"        , 4, 0, 10);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijkl_"       , 4, 0, 11);
//    
validateRecursiveLargest("abcdefghijkl", 0,      "abcd__"              , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "abcde__"             , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdef__"            , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefg__"           , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefgh__"          , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghi__"         , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghij__"        , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijk__"       , 4, 0, 10);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijkl__"      , 4, 0, 11);
//
validateRecursiveLargest("abcdefghijkl", 0,      "abcd___"             , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "abcde___"            , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdef___"           , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefg___"          , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefgh___"         , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghi___"        , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghij___"       , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijk___"      , 4, 0, 10);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijkl___"     , 4, 0, 11);
//    
validateRecursiveLargest("abcdefghijkl", 0,      "abcd____"            , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "abcde____"           , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdef____"          , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefg____"         , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefgh____"        , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghi____"       , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghij____"      , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijk____"     , 4, 0, 10);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijkl____"    , 4, 0, 11);
//    
validateRecursiveLargest("abcdefghijkl", 0,      "abcd_____"           , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "abcde_____"          , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdef_____"         , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefg_____"        , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefgh_____"       , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghi_____"      , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghij_____"     , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijk_____"    , 4, 0, 10);
validateRecursiveLargest("abcdefghijkl", 0,      "abcdefghijkl_____"   , 4, 0, 11);
//
//
//
validateRecursiveLargest("abcdefghijkl", 0,      "bcde"                , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdef"               , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefg"              , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefgh"             , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghi"            , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghij"           , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijk"          , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijkl"         , 4, 0, 10);
//
validateRecursiveLargest("abcdefghijkl", 0,      "bcde_"               , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdef_"              , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefg_"             , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefgh_"            , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghi_"           , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghij_"          , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijk_"         , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijkl_"        , 4, 0, 10);
//
validateRecursiveLargest("abcdefghijkl", 0,      "bcde__"              , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdef__"             , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefg__"            , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefgh__"           , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghi__"          , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghij__"         , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijk__"        , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijkl__"       , 4, 0, 10);
//
validateRecursiveLargest("abcdefghijkl", 0,      "bcde___"             , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdef___"            , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefg___"           , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefgh___"          , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghi___"         , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghij___"        , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijk___"       , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijkl___"      , 4, 0, 10);
//    
validateRecursiveLargest("abcdefghijkl", 0,      "bcde____"            , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdef____"           , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefg____"          , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefgh____"         , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghi____"        , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghij____"       , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijk____"      , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijkl____"     , 4, 0, 10);
//    
validateRecursiveLargest("abcdefghijkl", 0,      "bcde_____"           , 4, 0, 3);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdef_____"          , 4, 0, 4);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefg_____"         , 4, 0, 5);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefgh_____"        , 4, 0, 6);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghi_____"       , 4, 0, 7);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghij_____"      , 4, 0, 8);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijk_____"     , 4, 0, 9);
validateRecursiveLargest("abcdefghijkl", 0,      "bcdefghijkl_____ "   , 4, 0, 10);
//
//
//

validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "abcd"          , 4, ["abcd"]);
validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "abcde"         , 4, ["abcde"]);
validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "bcde"          , 4, ["bcde"]);
validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "abcdMNOP"   , 4, ["abcd", "MNOP"]);
validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "bcdeNOPQ"   , 4, ["bcde", "NOPQ"]);
validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "abcdefghiMNOPQRTUVW"   , 4, ["abcdefghi", "MNOPQRTUVW"]);
validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "MNOPabcd"   , 4, ["MNOP", "abcd"]);
validateRecursiveAll("abcdefghijkl____MNOPQRSTUVWXYZ", "abcdef.bcde.NOPQ.MNOPQ"   , 4, ["abcdef", "bcde", "NOPQ", "MNOPQ"]);
validateRecursiveAll("bcde___abcdefghijkl", "abcde.bcdef.bcde.bcde"   , 4, ["abcde", "bcdef", "bcde", "bcde"]);

/*
9->8 (ceil(log2(9)) is 3)
8->8 (ceil(log2(8)) is 3)

7->4 (ceil(log2(7)) is 2)
4->4 (ceil(log2(4)) is 2)

3->2 (ceil(log2(3)) is 1)
2->2 (ceil(log2(2)) is 1)

1->1 (ceil(log2(1)) is 0)

0->0 (special case)
*/

function findNextPowerOf2(x) {
    if (x < 0) {
        console.log("error fdstreGFDSert35, trying to find the next power of two for:" + x);
    }
    var pow = 1;
    while(pow <= x) {
        pow *= 2;
    }
    return pow;
}

//function findNearestSmallerOrEqualPowerOf2(x) {
//    if ((x < 0) || (ceil(x) != x)) {
//        console.log("error fdstreGFDSert34, trying to find the nearest power of two that is not higher for:" + x);
//    }
//    var pow = 1;
//    var powCandidate;
//    while((powCandidate = pow*2) <= x) {
//        pow = powCandidate;
//    }
//    return pow;
//}
//

function validateRecursiveBeg(a, b, c, d, e, f) {
    var ret = findEarliestPositionOfMatchRecurs(a, b, c, d, e);
//    document.writeln("<br> recursive beg: " + a + ", " + b +", " + c + ", " + d + "&nbsp;&nbsp;&nbsp;&nbsp;, " + e + ", expecting:" + f);
    if (ret !== f) {
//        document.writeln("<-- but received " + ret );
        console.log("problem with '" + a + "', " + b + "," + c + ", '" + d + "', " + e + " got " + ret + " instead of " + f);
        if (!alreadyShownOneAlert) {
//            alert("problem with '" + a + "', " + b + "," + c + ", '" + d + "', " + e + " got " + ret + " instead of " + f);
            alreadyShownOneAlert = true;
        }
    }
}

function validateRecursiveEnd(a, b, c, d, e, f) {
    var ret = findLatestPositionOfMatchRecurs(a, b, c, d, e);
//    document.writeln("<br> recursive end: " + a + ", " + b +", " + c + ", " + d + "&nbsp;&nbsp;&nbsp;&nbsp;, " + e + ", expecting:" + f);
    if (ret !== f) {
//        document.writeln("<-- but received " + ret );
        console.log("problem with '" + a + "', " + b + "," + c + ", '" + d + "', " + e + " got " + ret + " instead of " + f);
        if (!alreadyShownOneAlert) {
//            alert("problem with '" + a + "', " + b + "," + c + ", '" + d + "', " + e + " got " + ret + " instead of " + f);
            alreadyShownOneAlert = true;
        }
    }
}
    
function validateRecursiveLargest(a, b, c, d, expBeg, expEnd) {
    var ret = findInStringAtheLargestStringThatIncludesPositionBofStringCatLeastOfLengthD(a, b, c, d);
//    document.writeln("<br> recursive largest: " + a + ", " + b +", " + c + ", " + d + "&nbsp;&nbsp;&nbsp;&nbsp;, " + expBeg + ", expecting:" + expEnd);
    if ((ret.wasFound !== true) || (ret.begPos != expBeg) || (ret.endPos != expEnd)) {
//        document.writeln("<-- but received " + ret.begPos + ", " + ret.endPos );
        console.log("problem with '" + a + "', " + b + "," + c + ", '" + d + " got >>" + ret.wasFound + ", " + ret.begPos + ", " + ret.endPos+ "<< instead of >>>true, " + expBeg + ", " + expEnd + "<<<");
        if (!alreadyShownOneAlert) {
//            alert("problem with '" + a + "', " + b + "," + c + ", '" + d + "', " + e + " got " + ret + " instead of " + f);
            alreadyShownOneAlert = true;
        }
    }
}
function validateRecursiveAll(storedText, allPageText, minMatchLength, expectedReturn) {
    var retStringAndPosArray = findAllMatches(storedText, allPageText, minMatchLength);
    var stringToPrint = "<br> recursive All: \"" + storedText + "\", \"" + allPageText + "\", "  + minMatchLength + ", >>>";
    for(index1=0; index1 < retStringAndPosArray.length; index1++) {
        stringToPrint = stringToPrint + "[" + retStringAndPosArray[index1].stringFound + " from " + retStringAndPosArray[index1].begPosInPage + " to " + retStringAndPosArray[index1].endPosInPage + "]";
        if (index1 + 1 != retStringAndPosArray.length) {
            stringToPrint += ", ";
        }
    }
    stringToPrint += "<<<, while expecting >>>";
    for(index2=0; index2 < expectedReturn.length; index2++) {
        stringToPrint += expectedReturn[index2];
        if (index2 + 1 != expectedReturn.length) {
            stringToPrint += ", ";
        }
    }
    stringToPrint += "<<<";
    
    // validate if return array is as expected
    var thereWasError = false;
    if (retStringAndPosArray.length == expectedReturn.length) {
        for (index3 = 0; index3 < expectedReturn.length; index3++) {
            var isMatching = (retStringAndPosArray[index3].stringFound === expectedReturn[index3]);
            thereWasError = thereWasError || !isMatching;
         };
    }
    if (thereWasError) {
        stringToPrint += "<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<- ERROR ==================================";
        console.log(stringToPrint);
        //    document.write(stringToPrint);
    }
    else
    {
        if (debugLogRecursive) {
            console.log(stringToPrint);
        //    document.write(stringToPrint);
        } 
    }
}

// returns an array of objects (string + position in page) in the order they were found in page
function findAllMatches(storedText, allPageText, minMatchLength) {
    // prepare
    var jump = Math.floor (minMatchLength / 2);
    var currBeg = jump -1; // start farter than the position 0, since the algorithm will check before that point anyway
    var pageLength = allPageText.length;
    var stringAndPosArray= []; // no string found up to now
    
    // while not after the end of the page
    while (currBeg + jump < pageLength) {
        var matchString = "";
        // get the next bloc in the page, with the min match length
        var pageBlocToFind = allPageText.slice(currBeg, currBeg + jump);
        // find it (or longer) in storage
        var retString = findInStringAtheLargestStringThatIncludesPositionBofStringCatLeastOfLengthD(storedText, currBeg, allPageText, jump);

        // obtain string if one was found 
        if (retString.wasFound) {
            // there was a match. get the string that matched
            matchString = allPageText.slice(retString.begPos, retString.endPos + 1);
        }
        
        // put it in return structure only if the length is long enough
        if ((retString.wasFound) && (matchString.length >= minMatchLength)) {
            // Store 
            var stringAndPos = {
                stringFound  : matchString,
                begPosInPage : retString.begPos, 
                endPosInPage : retString.endPos // position of the last char that matchs 
            };
            stringAndPosArray.push(stringAndPos);            
            // set the new start point to after the end of the match
            currBeg = retString.endPos + jump;
        }
        else
        {
            // if there was no match, set the new start point a little bit more far (jump characters to be exact)
            currBeg += jump;
        }

        // continue the while
    };
    return stringAndPosArray;
}

// returns -1 if not found
// returns  0 if string starting at position 0 is found in Astring
// returns  1 if string starting at position 1 is found in Astring
function findEarliestPositionOfMatchRecurs(Astring, BbegPosInDstring, CendPosInDstring, Dstring, EcurrentJump) {
    var posToReturn = -100;
    var newBbegPosToTest = -100;
    var found = false;
    var validIndex = (BbegPosInDstring >= 0);
    var stringUnderTest ="-BAD-bad-";
    var nextJumpToUse = Math.floor((EcurrentJump + 1) / 2); // 3 -> 2



    if (validIndex) {
        stringUnderTest = Dstring.slice(BbegPosInDstring, CendPosInDstring + 1);
        found = (Astring.indexOf(stringUnderTest) >= 0);
        //matchedString = stringUnderTest.slice(1);

        if (found) {
            // found

            // if this is the last test to do
            if (EcurrentJump === 1) {
                    // returns this position
                if (debugLogRecursive) {
                    console.log("first char that matches is at pos=" + BbegPosInDstring + ", and string will begin with: \"" + stringUnderTest + "\"");
                }
                return BbegPosInDstring;
            }
            newBbegPosToTest = BbegPosInDstring - nextJumpToUse;
        } else {
            // not found

            // if this is the last test to do
            if (EcurrentJump === 1) {
                // returns the position after
                if (debugLogRecursive) {
                    console.log("first char that matches is at pos=" + (BbegPosInDstring + 1) + ", and string will begin with: \"" + stringUnderTest.slice(1) + "\".");
                }
                return BbegPosInDstring + 1;
            }
            newBbegPosToTest = BbegPosInDstring + nextJumpToUse;
        }
    } else { // else of "if index is valid"
        // index was < 0
        // if this is the last test to do
        if (EcurrentJump != 1) {
            // ok, this is not the last step
            newBbegPosToTest = BbegPosInDstring + nextJumpToUse;
        } else {
            // this is the last step. This is valid only if index == -1
            if (BbegPosInDstring === -1) {
                // this is ok, it means that the proper index is 0
                if (debugLogRecursive) {
                    console.log("first char that matches is at pos=0, and string will begin with: \"" + Dstring.slice(0,CendPosInDstring+1) + "\"");
                }
                return 0; //  best match was found previously at position 0
            } else {
                console.log("PROBLEM 54hj3k2g3h45 - index is negative(" + BbegPosInDstring + "), and this is the last step!");
//                alert ("bug 54hj3k2g3h45");
            }
        }

    }
    posToReturn = findEarliestPositionOfMatchRecurs(Astring, newBbegPosToTest, CendPosInDstring, Dstring, nextJumpToUse);
    return posToReturn;

}


    
// returns -1 if not found
// returns  99 if string ending at position 99 is found in Astring
// returns  100 if string ending at position 100 is found in Astring
// note: EcurrentJump should be  0 if there are  0 other char after CendPosInDstring in Dstring -> we will search 0 times
// note: EcurrentJump should be  1 if there are  1 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  2 if there are  2 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  2 if there are  3 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  4 if there are  4 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  4 if there are  5 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  4 if there are  6 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  4 if there are  7 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  8 if there are  8 other char after CendPosInDstring in Dstring
// note: EcurrentJump should be  8 if there are  9 other char after CendPosInDstring in Dstring
function findLatestPositionOfMatchRecurs(Astring, BbegPosInDstring, CendPosInDstring, Dstring, EcurrentJump) {
    // case where there is no other characters
    if (EcurrentJump == 0) {
        if (debugLogRecursive) {
            console.log("last char that matches is at pos=" + (CendPosInDstring) + ", and string will end with: \"" + Dstring + "\"");
        }
        return CendPosInDstring;
    }

    var posToReturn = -100;
    var newCendPosToTest = -100;
    var found = false;
    var Dlength = Dstring.length;
    // validIndex will be false if the last position to use is outside Dstring
    var validIndex = (CendPosInDstring < Dlength);
    var stringUnderTest ="-BAD-bad-";
//    var nextJumpToUse = Math.floor((EcurrentJump + 1) / 2); // 3 -> 1
    var nextJumpToUse = EcurrentJump  / 2;


    if (validIndex) {
        stringUnderTest = Dstring.slice(BbegPosInDstring, CendPosInDstring + 1);
        found = (Astring.indexOf(stringUnderTest) >= 0);
        //matchedString = stringUnderTest.slice(1);

        if (found) {
            // found

            // if this is the last test to do
            if (EcurrentJump === 1) {
                // returns this position
                if (debugLogRecursive) {
                    console.log("last char that matches is at pos=" + (CendPosInDstring) + ", and string will end with: \"" + stringUnderTest + "\"");
                }
                return CendPosInDstring;
            }
            newCendPosToTest = CendPosInDstring + nextJumpToUse;
        } else {
            // not found

            // if this is the last test to do
            if (EcurrentJump === 1) {
                // returns the position after
                if (debugLogRecursive) {
                    console.log("last char that matches is at pos=" + (CendPosInDstring - 1) + ", and string will end with: \"" + stringUnderTest.slice(0, CendPosInDstring) + "\".");
                }
                return CendPosInDstring - 1;
            }
            newCendPosToTest = CendPosInDstring - nextJumpToUse;
        }
    } else { // else of "if index is valid"
        // index was after the last char of Dstring.
        // if this is the last test to do
        if (EcurrentJump != 1) {
            // ok, this is not the last step
            newCendPosToTest = CendPosInDstring - nextJumpToUse;
        } else {
            // this is the last step. This is valid only if index == char just after the end of the string
            if (CendPosInDstring === Dlength) {
                // this is ok, it means that the proper index is the last char of the string
                if (debugLogRecursive) {
                    console.log("last char that matches is at pos=" + (Dlength - 1) + ", and string will end with: \"" + Dstring.slice(0, CendPosInDstring + 1) + "\"");
                }
                return (Dlength - 1); //  best match was found previously at position of last char in the string 
            } else {
                console.log("PROBLEM ytreyr54ytr - index is too big(" + CendPosInDstring + "), and this is the last step!");
//                alert("bug ytreyr54ytr");
            }
        }

    }
    posToReturn = findLatestPositionOfMatchRecurs(Astring, BbegPosInDstring, newCendPosToTest, Dstring, nextJumpToUse);
    return posToReturn;

}


// returns {
//  wasFound,          true if found
//  begPos,            valid value only if wasFound is true
//  endPos             valid value only if wasFound is true
//}
function findInStringAtheLargestStringThatIncludesPositionBofStringCatLeastOfLengthD(Astring, BbeginCString, Cstring, DminLength) {
    var nextJumpToUse = Math.floor(DminLength + 1 / 2); // 3 -> 2
    var begUnderTest = BbeginCString;
    var endUnderTest = BbeginCString + DminLength;
    var stringUnderTest = Cstring.slice(begUnderTest, endUnderTest);
    var begFound = -100;
    var endFound = -100;
    var stringFound = "";
    var returnStruct = {
        wasFound : false,
        begPos   : -1,
        endPos   : -1
    };
    
    if (debugLogRecursive) {
        console.log("trying to find \"" + stringUnderTest + "\" (and more) in \"" + Astring + "\"");
    }
    
    // try to find the basic string
    var basicStringWasFound = (Astring.indexOf(stringUnderTest) >= 0);

    if (basicStringWasFound){
        returnStruct.wasFound = true;
        // basic was found
        // now searching earliest pos
        returnStruct.begPos = findEarliestPositionOfMatchRecurs(Astring, BbeginCString, BbeginCString + DminLength - 1, Cstring, nextJumpToUse);
        // now searching latest pos
        var nbCharAfterTheEndOfThisSmallBloc = Cstring.length - (BbeginCString + DminLength - 1);
//        nextJumpToUse = Math.floor(nbCharAfterTheEndOfThisSmallBloc / 2) + 1;
        nextJumpToUse = findNextPowerOf2(nbCharAfterTheEndOfThisSmallBloc);
        if (debugLogRecursive) {
            console.log("before calling findLatest, computed remaining chars is: " + nbCharAfterTheEndOfThisSmallBloc + " and jump is: " + nextJumpToUse);
        }
        returnStruct.endPos =   findLatestPositionOfMatchRecurs(Astring, BbeginCString, BbeginCString + DminLength - 1, Cstring, nextJumpToUse);
    
        if (debugLogRecursive) {
            console.log("Starting with \"" 
                    + stringUnderTest 
                    + "\", and ending with \"" 
                    + Astring.slice(returnStruct.begPos, returnStruct.endPos + 1) 
                    + "\", found at pos " 
                    + returnStruct.begPos 
                    + " to " 
                    + returnStruct.endPos 
                    + " in \"" 
                    + Astring 
                    + "\""
                   );
        }
    }
    return returnStruct;

}
