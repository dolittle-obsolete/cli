
import { a_system_that_returns_a_bounded_context_configuration_without_a_backend_language } from './given/a_system_that_returns_a_bounded_context_configuration_without_a_backend_language';

describe('when getting a bounded context configuration that has a backend without a language', () => {
    let context = new a_system_that_returns_a_bounded_context_configuration_without_a_backend_language();

    it('should throw an exception', () => 
        expect( () => context.artifactsManager._getNearestBoundedContextConfig('somePath')).to.throw());

});