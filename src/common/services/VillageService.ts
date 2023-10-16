import { VillageStartingValues } from "../constants/VillageConstants"
import VillageRepository from "../repositories/VillageRepository"
import { VillageDetails } from "../types/Village"
import { generateRandomNumber, generateRandomString } from "../util/random"

const {
  commoners: [fromCommoners, toCommoners],
  heroes: [fromHeroes, toHeroes],
  gold: [fromGold, toGold],
  food: [fromFood, toFood],
  reputation: [fromReputation, toReputation],
} = VillageStartingValues

const generateStartingVillageValues = () => ({
  commoners: generateRandomNumber(fromCommoners, toCommoners),
  heroes: generateRandomNumber(fromHeroes, toHeroes),
  gold: generateRandomNumber(fromGold, toGold),
  food: generateRandomNumber(fromFood, toFood),
  reputation: generateRandomNumber(fromReputation, toReputation),
})

const initNewVillage = (name: string): VillageDetails => {
  const {
    commoners,
    heroes,
    gold,
    food,
    reputation
  } = generateStartingVillageValues()

  return {
    name,
    villageId: generateRandomString(),
    commonerPopulation: commoners,
    heroPopulation: heroes,
    gold,
    food,
    reputation,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}

export default {
  fetchVillageDetails: async (userEmail: string): Promise<VillageDetails> => {
    const village = await VillageRepository.fetchVillageDetails(userEmail)

    return village
  },
  createVillage: async (userEmail: string, villageName: string): Promise<VillageDetails> => {
    const village = initNewVillage(villageName)
    const createdVillage = await VillageRepository.saveVillageDetails(userEmail, village)

    return createdVillage
  },
}
