pragma solidity ^0.6.2;
import "@opengsn/gsn/contracts/BaseRelayRecipient.sol";
import "@opengsn/gsn/contracts/interfaces/IKnowForwarderAddress.sol";

contract CaptureTheFlag is BaseRelayRecipient, IKnowForwarderAddress {

	event FlagCaptured(address _from, address _to);

	address flagHolder = address(0);

	constructor(address _forwarder) public {
		trustedForwarder = _forwarder;
	}

	function captureFlag() external {
		address previous = flagHolder;
		flagHolder = _msgSender();
		emit FlagCaptured(previous, flagHolder);
	}

  function versionRecipient() external view override returns (string memory) {
    return "0.0.1";
  }

  function getTrustedForwarder() public override view returns(address) {
    return trustedForwarder;
  }

}
