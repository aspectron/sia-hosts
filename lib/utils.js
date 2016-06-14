var $ = { }

$.PAD = function(text, length) 
{ 
    text = ''+text;
    if(length < 0)
    {
        var pad = -length-text.length; 
        while(pad-- > 0) 
            text = text+" "; 
    }
    else
    {
        var pad = length-text.length; 
        while(pad-- > 0) 
            text = " "+text; 
    }
    return text; 
}


module.exports = $;