﻿using WebUI.Areas.Admin.Models.MiniModels;

namespace WebUI.Areas.Admin.Models
{
    public class TrainngViewModel
    {
    //    { data: 'TrainingName' },
    //        { data: 'TeamName' },
    //        { data: 'Date' },
    //        { data: 'Players' },

        public int Id { get; set; }
        public string TrainingName { get; set; }
        public string TeamName { get; set; }
        public DateTime Date { get; set; }
        public List<string> ListPlayers { get; set; }
        public List<NameAcceptMiniModel> players { get; set; }
        public string ManagerName { get; set; }

    }
}
