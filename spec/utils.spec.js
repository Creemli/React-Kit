/**
 * Created by lixiaoxi on 2017/3/1.
 * @description
 */


import chai, {expect} from 'chai';
import Config from '../src/config';

chai.should();


describe('Util Function Test', () => {

    it('Config 测试', () => {

        before(() => {
           // do something
        });

        expect(Config).to.be.a('object');

        expect(Config).to.include.keys('env');

        expect(Config).to.include.keys('getEnv');

        expect(Config.getEnv()).to.be.a('string');

        expect(Config.isMock()).to.be.a('boolean');

        expect(Config.getEnvByHref()).to.be.oneOf(['', 'mock', 'test', 'uat', 'prePro', 'pro'])


        after(() => {
            // do something
        });
    });



});
