import { ConnectOptions, connect } from 'mongoose';

const mongodUri = process.env.MONGOURI || '';

const connectDB = async () => {
    try {
        await connect(mongodUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          } as ConnectOptions)
          console.log('mongoose connected!')
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export default connectDB;
