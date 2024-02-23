import passport from 'passport';
import { Strategy } from 'passport-local';
import db from '../models/index.js';

const User = db.User;

export default passport.use(
	new Strategy({usernameField: 'email'}, async (email, password, done) => {
		try {
			const findUser = await User.findOne({where: { email }});
			if (!findUser) throw new Error('User not found');
			if(!findUser.validPassword(password)) {
				throw new Error('Invalid password');
			}
			done(null, findUser);
		} catch (error) {
			done(error, null);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});
  