import styled from 'styled-components'

export const GameWrapper = styled.div`
    width: 100%;
    height: 100%;

    .control{
        width:100%;
        height:100%
    }

   .container{
    position: absolute;
    left:50%;
    transform:translate(-50%);
    bottom:80px;
    background-color:#ccc3;
    border-radius: 30px;
    display: flex;
    align-items: center;
   }

   .color-item::after{
    content: "";
    display: block;
    position:relative;
    left:50%;
    top:50%;  
    transform:translate(-50%,-50%);  
    width:38px;
    height:38px;
    border-radius:50%;
    border:2px solid #fff;
   }
    
    .StateTable-container {
        position: absolute;
        top: 25vmin;
        right: 0;
        height: 50vmin;
        width: 3rem;
        margin: 0 2% 0 0;
        justify-content: center;
        display: flex;
        align-items: center;
        opacity: 1;
        transition: all 0.2s ease 0.3s;
    }
    .StateTable-content {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .backgroundLine {
        position: absolute;
        height: 100%;
        width: 1px;
        background-color: #ffffffa0;
    }
    .StateTable-content .item {
        position: relative;
        right: calc(.5rem - .5px);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #fff;
        transform: scale(0.8);
    }
    .StateTable-content .item-Line {
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        width: calc(1rem + 6px);
        height: calc(1rem + 6px);
        border-radius: 50%;
        box-shadow: 0 0 0 1px #ff9245;
    }
    .StateTable-content  .tableName {
        -webkit-user-select: none;
        user-select: none;
        position: relative;
        height: 1rem;
        width: 1rem;
        top: -1px;
        left: -2rem;
        color: #ccc;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }
    .StateTable-content  .tableName div {
        font-size: 1.2rem;
        white-space: nowrap;
        transition: all .3s;
    }
    .StateTable-content .clickBox {
        cursor: pointer;
        position: absolute;
        top: -1.25rem;
        left: -3.5rem;
        height: 3rem;
        width: 5rem;
    }

    .StateTable-content .activeColor{
        color: rgb(255, 255, 255);
    }
    .StateTable-content .activeBg{
        background-color: rgb(255, 146, 69);
    }
    
    .TopInfo-container{
        position: absolute;
        top: 0;
        width: 100%;
        margin-top: 5vmin;
        pointer-events: none;
        //opacity: 0;
    }
    .TopInfo-content{
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
    }
    .TopInfo-content .text{
        margin-top: 1vmin; 
        color: rgb(255, 255, 255); 
        font-size: 1.8vmin;
    }
    .TopInfo-content .text_1{
        margin-top: 1.5vmin; 
        color: rgb(170, 170, 170); 
        font-size: 1.4vmin;
    }
    .TopInfo-content .text_2{
        margin-top: 2vmin; 
        color: rgb(240, 198, 159); 
        font-size: 2vmin;
    }
    .TopInfo-content .addon {
        position: absolute;
        bottom: -15vmin;
        left: 6rem;
        width: 14vmin;
        height: 12vmin;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 2vmin;
        line-height: 32px;
    }
    .TopInfo-content .addon .content{
        margin-top: 10vmin;
    }
    .TopInfo-content .addon .number{color: rgb(255, 146, 69);}
`
