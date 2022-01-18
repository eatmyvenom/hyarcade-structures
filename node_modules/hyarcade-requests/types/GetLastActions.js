module.exports = function GetLastActions (acc) {
  if(acc.displayname == undefined) return { quest: { time: 0 }, pets: 0, dailyReward: 0 };

  const allQuests = acc?.quests ?? {};

  let lastQuestTime = 0;
  let lastQuestName;

  for(const questName in allQuests) {
    const quest = allQuests[questName];
    if(quest.completions) {
      if(quest.completions[quest.completions.length - 1].time > lastQuestTime) {
        lastQuestTime = quest.completions[quest.completions.length - 1].time;
        lastQuestName = questName;
      }
    }
  }

  const quest = { time: lastQuestTime, name: lastQuestName };

  const allPets = acc?.petStats ?? {};

  let lastPetTime = 0;

  for(const petName in allPets) {
    const pet = allPets[petName];

    const thisPetTime = Math.max(pet?.THIRST?.timestamp ?? 0, pet?.EXERCISE?.timestamp ?? 0, pet?.HUNGER?.timestamp ?? 0);

    if(thisPetTime > lastPetTime) {
      lastPetTime = thisPetTime;
    }
  }

  return { quest, pets: lastPetTime, dailyReward: acc?.lastAdsenseGenerateTime ?? 0 };
};