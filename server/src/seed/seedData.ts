/**
 * Seed data for the Historical Atlas database.
 * Contains realistic regions and historical eras.
 */

export const regionsSeedData = [
  {
    name: 'Europe',
    description:
      'The continent that witnessed the rise and fall of the Roman Empire, the Medieval Crusades, the Napoleonic Wars, and both World Wars. From the ancient battlefields of Thermopylae to the trenches of the Western Front, Europe has been the stage for some of history\'s most consequential conflicts.',
  },
  {
    name: 'Asia',
    description:
      'Home to the Mongol conquests, the Warring States of China and Japan, the campaigns of Timur, and the theaters of the Pacific War. Asia\'s vast geography has shaped warfare from the steppes of Central Asia to the jungles of Southeast Asia.',
  },
  {
    name: 'Africa',
    description:
      'From the ancient Egyptian campaigns and Carthaginian wars to the Zulu Kingdom\'s military innovations and colonial-era conflicts, Africa\'s military history spans millennia of strategy, resistance, and empire-building across diverse terrains.',
  },
  {
    name: 'Middle East',
    description:
      'The cradle of civilization and a crossroads of empires — from the Assyrian war machine and Persian campaigns to the Ottoman conquests and modern conflicts. The Middle East has been contested ground for over five thousand years.',
  },
  {
    name: 'Americas',
    description:
      'From the Aztec Flower Wars and Inca expansion to the American Revolution, the Civil War, and the liberation campaigns of South America. The Americas\' military history reflects both indigenous warfare traditions and colonial-era transformations.',
  },
  {
    name: 'Oceania',
    description:
      'The Pacific theater of World War II, the Maori Wars of New Zealand, and the strategic island-hopping campaigns that defined modern amphibious warfare. Oceania\'s military history is shaped by its vast ocean distances and island geography.',
  },
];

export const erasSeedData = [
  {
    name: 'Ancient',
    startYear: -3000,
    endYear: -500,
    description:
      'The dawn of organized warfare — from the first Sumerian city-state conflicts and Egyptian campaigns through the rise of Assyria, Babylon, and the early Persian Empire. This era saw the invention of the chariot, bronze weaponry, and professional armies.',
  },
  {
    name: 'Classical',
    startYear: -500,
    endYear: 500,
    description:
      'The age of Greece and Rome — from the Persian Wars and Alexander\'s conquests to the Punic Wars and the fall of the Western Roman Empire. This era perfected the phalanx, the legion, and siege warfare on a scale never before seen.',
  },
  {
    name: 'Early Medieval',
    startYear: 500,
    endYear: 1000,
    description:
      'The era of migrations, Viking raids, the rise of Islam\'s caliphates, and the Carolingian Empire. Feudal warfare emerged in Europe while the Byzantine Empire preserved Roman military traditions in the East.',
  },
  {
    name: 'High Medieval',
    startYear: 1000,
    endYear: 1300,
    description:
      'The age of Crusades, castle warfare, mounted knights, and the Mongol invasions that reshaped Eurasia. Military orders like the Templars and Hospitallers emerged, and siege technology advanced rapidly.',
  },
  {
    name: 'Late Medieval',
    startYear: 1300,
    endYear: 1500,
    description:
      'The Hundred Years\' War, the fall of Constantinople, the rise of gunpowder weapons, and the transformation of feudal armies into professional forces. The longbow, crossbow, and early cannon changed the battlefield forever.',
  },
  {
    name: 'Renaissance',
    startYear: 1500,
    endYear: 1650,
    description:
      'The military revolution — the Italian Wars, the Ottoman expansion into Europe, the Spanish conquests of the Americas, and the emergence of pike-and-shot tactics. Fortification design transformed with the trace italienne.',
  },
  {
    name: 'Early Modern',
    startYear: 1650,
    endYear: 1800,
    description:
      'The age of absolute monarchies and their armies — the Thirty Years\' War aftermath, Louis XIV\'s wars, the Great Northern War, the Seven Years\' War, and the American and French Revolutions that birthed citizen armies.',
  },
  {
    name: 'Industrial',
    startYear: 1800,
    endYear: 1914,
    description:
      'The Napoleonic Wars, the American Civil War, the Franco-Prussian War, and the colonial wars that divided the globe. Railroads, rifles, telegraphs, and ironclad warships transformed the scale and lethality of conflict.',
  },
  {
    name: 'Modern',
    startYear: 1914,
    endYear: 2000,
    description:
      'The World Wars, the Cold War, decolonization conflicts, and the dawn of nuclear deterrence. Tanks, aircraft, submarines, and eventually guided missiles redefined what war meant for humanity.',
  },
];
