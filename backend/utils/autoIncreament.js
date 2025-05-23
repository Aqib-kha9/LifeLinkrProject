import Counter from "../Models/counter.js";

export const getNextSequence = async (counterId) => {
  const counter = await Counter.findOneAndUpdate(
    { id: counterId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};
