pragma solidity ^0.8.7;

interface AirConditioings {
    function getAcDetail(uint256 acId) external view returns (address,uint256,uint256);
    function setAdmin(uint256 acId, uint256 tokenValue) external;
    function setDegree(uint256 acId, uint256 _degree) external;

    event acOwnerChanged(address newOwner, uint256 ac_changed);
    event acDegreeChanged(uint256 ac_changed,uint256 newDegree);

}

contract SetAirConditioing is AirConditioings {

    uint256 [4] acTokenAmount;  
    uint256 [4] acDegree; 
    address [4] acWallet;

    IERC20 private _ubxsToken; 

    constructor(address tokenAddress) {
        _ubxsToken = IERC20(tokenAddress); 
    }


    function getAcDetail(uint256 acId) public view override returns (address,uint256,uint256) {
        return (acWallet[acId],acTokenAmount[acId],acDegree[acId]);
    }

    function setAdmin(uint256 acId, uint256 tokenValue) public override {

        require(acId<acTokenAmount.length,"out of bounds");
        require(acTokenAmount[acId]<tokenValue,"Don't be afraid to take risks, increase the price :)");
        require( 
            _ubxsToken.transferFrom(msg.sender, address(this), tokenValue ),
            "Transaction Error"
        );
        acWallet[acId]= msg.sender;
        acTokenAmount[acId] = tokenValue;
        emit acOwnerChanged(msg.sender,acId);
    }

    function setDegree(uint256 acId, uint256 _degree) public override {
        require(acId<acTokenAmount.length,"out of bounds");
        require(acWallet[acId] == msg.sender, "no admin");
        require(_degree>15&&_degree<33,"invalid range");
        acDegree[acId]=_degree;
        emit acDegreeChanged(acId,acDegree[acId]);
    }
 }
