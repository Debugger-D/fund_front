define(['jquery'], function($) {

	var page = {
        que: [],
        push: function(b) {
            if(!b) return this.que;

            // push block
            if( _.isArray(b) ) {
                this.que = _.union(this.que, b);
            } else {
                this.que.push(b);
            }

            return this;
        },
        run: function() {
            var bq = this.que
            for(var i = 0; i < bq.length; i++) {
                typeof bq[i].run == 'function' && bq[i].run();
            }

            return this;
        },
        init: function() {
            
            // fire!
            this.run();
            
            return this;
        }
    }


    return page;
}